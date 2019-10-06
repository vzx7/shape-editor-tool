import { Injectable } from '@angular/core';
import { Colors } from 'modules/shared/enums/colors.enum';
import { StorageService } from 'modules/shared/services/storage/storage.service';
import { Zone } from 'modules/shared/interfaces/schema/zone';
import { Stand } from 'modules/shared/interfaces/schema/stand';
import * as genUuid from 'shortid';
import * as d3 from 'd3';
import * as contextMenu from 'd3-context-menu';
import { PainterHelperService } from '../painter-helper/painter-helper.service';
import { PainterEntity } from 'modules/editor/classes/painter-entity';
import { PolygonEditable } from 'modules/editor/interfaces/polygon-editable';
import { EditorState } from 'modules/shared/interfaces/editor/editor-state';
import { ObjectType } from 'modules/shared/enums/object-type.enum';
import { Vector } from 'modules/shared/interfaces/geometry/vector';
import { SvgNativeHelperService } from '../svg-native-helper/svg-native-helper.service';
import { EditorMode } from 'modules/shared/enums/editor-mode.enum';
import { EditorСSSClasses } from 'modules/editor/enums/editorсssclasses.enum';
import { EditorStateService } from 'modules/shared/services/editor-state/editor-state.service';
import { WorkAreaService } from 'modules/shared/services/work-area/work-area.service';

/**
 * Сервис для создания и редактирования объектов геометрии.
 */
@Injectable()
export class PainterService extends PainterEntity {
  /**
   * Сдвиг индекса массива точек на 2 (предпоследний элемент массива)
   */
  private readonly shiftByTwo: number = 2;

  /**
   * Класс для редактируемых слоев.
   */
  private editableLayerClassName: string;

  /**
   * Блокировка после создания полигона.
   */
  private isCreateFinish: boolean;

  /**
   * Вектор для события рисования.
   */
  private dragVector: Vector;

  constructor(
    private readonly storageService: StorageService,
    private readonly svgNativeHelperService: SvgNativeHelperService,
    protected readonly editorStateService: EditorStateService,
    readonly helper: PainterHelperService,
    private readonly workAreaService: WorkAreaService
  ) {
    super(editorStateService);
    genUuid.characters('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийк');
  }

  /**
   * Активация инструмента рисования.
   * @param editorState состояние редактора
   */
  public enableEditing(editorState: EditorState): void {
    this.objectType = editorState.objectType;
    this.editorMode = editorState.editorMode;
    this.objectId = editorState.objectId;
    this.helper.setEditorState(editorState);

    this.getSvg();

    this.svg.append('g')
      .classed(EditorСSSClasses.PivotPointLayer, true);

    if (this.objectId && this.editorMode === EditorMode.Update) {
      d3.select(`[data-id="${this.objectId}"]`).classed(EditorСSSClasses.OneEditableLayer, true);
      this.editableLayerClassName = EditorСSSClasses.OneEditableLayer;
    } else if (this.editorMode === EditorMode.Update) {
      this.editableLayerClassName = EditorСSSClasses.EditableLayer;
    } else {
      this.editableLayerClassName = EditorСSSClasses.NewPolygon;
    }

    this.setPolygonsForUpdate();
  }

  /**
   * Метод для создания полигонов.
   */
  public drawPolygon(): void {
    super.getSvg();
    this.svg
      .on('mouseup', this.mouseUpHandler.bind(this))
      .on('mousemove', this.mouseMoveHandler.bind(this));
  }

  /**
   * Отключение инструмента рисования полигона.
   */
  public drawPolygonStop(): void {
    const existLayers = d3.selectAll(`g.${this.editableLayerClassName}`).nodes();

    existLayers.forEach(
      (item): void => {
        const layer = d3.select(item);
        const object: Stand | Zone =
          this.storageService.getObject(layer.attr('data-type') as ObjectType, layer.attr('data-id'));
        const polygon = layer.select('path');
        const polygonGeometry = this.getGeometry(layer);
        polygon.style('fill', null).classed(EditorСSSClasses.PolygonEditArea, false);
        polygon.on('contextmenu', null);
        object.geometry.bound = polygonGeometry.geometry.bound;
        object.geometry.holes = polygonGeometry.geometry.holes;
      }
    );

    d3.select(`g.${EditorСSSClasses.PivotPointLayer}`).remove();
    this.killEventHandlers(['mouseup', 'mousemove']);
  }

  /**
   * Завершаем создание полигона.
   */
  public endCreatePolygon(): void {
    d3.selectAll(`.${EditorСSSClasses.NewPolygon}`)
      .style('fill', null).classed(EditorСSSClasses.NewPolygon, false);
    this.isCreateFinish = false;

    this.helper.editingFinish();
  }

  /**
   * Подготовка всех полигонов к редактированию.
   */
  private setPolygonsForUpdate(): void {
    this.svg.selectAll(`g.${this.editableLayerClassName}`).nodes().forEach((item): void => {
      const uuid = genUuid.generate();

      this.groupLayer = d3.select(item);
      this.groupLayer.select('path')
        .attr('id', uuid)
        .on('contextmenu', contextMenu(this.helper.menuForPolygon));

      const objectType = this.groupLayer.attr('data-type');
      const objectId = this.groupLayer.attr('data-id');
      const object: Zone | Stand = this.storageService.getObject(objectType, objectId);

      this.setBoundCords(object, uuid);
      this.setHoleCords(object, uuid);

      this.groupLayer.select('path')
        .classed(EditorСSSClasses.PolygonEditArea, true)
        .style('fill', Colors.RedLight);
    });
  }

  /**
   * Настройка внешнего контура объекта.
   * @param obj объект
   * @param uuid ID объекта
   */
  private setBoundCords(obj: Zone | Stand, uuid: any): void {
    const boundCords: Vector[] = [];
    obj.geometry.bound.forEach((xy: Vector, index: number) => {
      boundCords.push(xy);
      this.setCoordinatesForCords(index, obj.geometry.bound, boundCords, xy);
    });
    this.helper.generateCircles(boundCords, uuid, false);
  }

  /**
   * Настройка внутренних контуров.
   * @param obj объект.
   * @param uuid ID полигона.
   */
  private setHoleCords(obj: Zone | Stand, uuid: any): void {
    if (obj.geometry.holes) {
      obj.geometry.holes.forEach((hole: Vector[], order: number) => {
        const holesCords = [];
        hole.forEach((xy: Vector, index: number) => {
          holesCords.push(xy);
          this.setCoordinatesForCords(index, hole, holesCords, xy);
        });
        this.helper.generateCircles(holesCords, uuid, true);
      });
    }
  }

  /**
   * Собираем массив координат.
   * @param index Индекс
   * @param coords маасив с координатами.
   * @param boundCords Итоговый координаты
   * @param xy Элемент [x, y]
   */
  private setCoordinatesForCords(index: number, coords: Vector[], boundCords: Vector[], xy: Vector): void {
    if (index + 1 < coords.length) {
      boundCords.push(this.helper.generateIntermediatePoint(xy, coords[index + 1]));
    } else if (index + 1 === coords.length) {
      boundCords.push(this.helper.generateIntermediatePoint(xy, coords[0]));
    }
  }

  /**
   * Не выполнять обработкиу клика.
   * @param target Элемент на который приходится клика.
   * @return boolean
   */
  private isMouseUpHandlerDisable(target: SVGGraphicsElement): boolean {
    let isHole: boolean;
    if (target.localName === 'path') {
      isHole = target.classList.contains(EditorСSSClasses.CreateHoleActive);
    } else if (target.localName === 'circle' && target.dataset.id) {
      const path = d3.select(`path#${target.dataset.id}`);
      isHole = (<SVGGraphicsElement>path.node()).classList.contains(EditorСSSClasses.CreateHoleActive);
    }

    return this.dragging
      || (this.editorMode === EditorMode.Update && target.localName === 'svg')
      || d3.event.button !== 0
      || (
        this.isCreateFinish
        && !isHole
      );
  }

  /**
   * Хандлер для собтия mouseup
   */
  private mouseUpHandler(): void {
    this.getSvg();

    if (this.isMouseUpHandlerDisable(d3.event.target)) {
      return;
    }

    if (!this.isPolygonOnAddHoleInFocus()) {
      this.helper.deactivateCreatorHole();
    }
    this.setTargetCorditnate();
    this.drawing = true;
    this.drawStartPoint = { x: this.dragVector.x, y: this.dragVector.y };

    if (this.svg.select(`g.${EditorСSSClasses.DrawPolygon}`).empty()) {
      this.groupLayer = this.svg.append('g')
        .classed(EditorСSSClasses.DrawPolygon, true)
        .attr('transform', this.getTransformForLayer());
    }

    if (d3.event.target.hasAttribute('is-handle')) {
      this.closePolygon.call(this);

      return;
    }

    this.setEditablePolygonPoints();
  }

  /**
   * Настройка редактируемых точек.
   */
  private setEditablePolygonPoints(): void {
    this.editablePolygonPoints.push({ x: this.dragVector.x, y: this.dragVector.y });
    if (this.editablePolygonPoints.length > 1) {
      const intermediatePoint =
        this.helper.generateIntermediatePoint(
          this.editablePolygonPoints[this.editablePolygonPoints.length - this.shiftByOne],
          this.editablePolygonPoints[this.editablePolygonPoints.length - this.shiftByTwo]
        );
      const pop = this.editablePolygonPoints.pop();
      this.editablePolygonPoints.push(intermediatePoint);
      this.editablePolygonPoints.push(pop);
    }

    this.groupLayer.select('polyline').remove();
    this.groupLayer.append('polyline')
      .attr('points', this.editablePolygonPoints.map((v) => [v.x, v.y]))
      .style('fill', 'none')
      .attr('vector-effect', 'non-scaling-stroke')
      .attr('stroke', Colors.Black);

    this.editablePolygonPoints.forEach((item, index) => {
      if (index % this.delimiter !== 0) {
        this.groupLayer.append('circle')
          .attr('cx', item.x)
          .attr('cy', item.y)
          .attr('r', this.workAreaService.revertByScale(this.intermediatePointRadius))
          .attr('is-handle', 'true')
          .attr('vector-effect', 'non-scaling-stroke')
          .style('cursor', 'pointer');
      } else {
        this.groupLayer.append('circle')
          .attr('cx', item.x)
          .attr('cy', item.y)
          .attr('r', this.workAreaService.revertByScale(this.radiusPoint))
          .attr('fill', this.isPolygonOnAddHoleInFocus() ? Colors.Green : Colors.Red)
          .attr('is-handle', 'true')
          .attr('vector-effect', 'non-scaling-stroke')
          .attr('data-id', this.helper.uuidPolygonForHoleCreator)
          .style('cursor', 'pointer');
      }
    });
  }

  /**
   * Получить трансформацию для слоя.
   * @return transform
   */
  private getTransformForLayer(): string {
    const layer = d3.select(`g#g-${this.helper.uuidPolygonForHoleCreator}`);
    if (!layer.empty()) {
      return layer.attr('transform');
    }

    return '';
  }

  /**
   * Хэндлер для события движения мыши.
   * @param type тип для которого вызвается событие.
   */
  private mouseMoveHandler(): void {
    if (!this.drawing) { return; }

    const group = d3.select(`g.${EditorСSSClasses.DrawPolygon}`);
    const step = 2;

    this.setTargetCorditnate();

    group
      .select('line')
      .remove();

    group
      .append('line')
      .attr('x1', this.drawStartPoint.x)
      .attr('y1', this.drawStartPoint.y)
      .attr('x2', this.dragVector.x + this.workAreaService.revertByScale(step))
      .attr('y2', this.dragVector.y + this.workAreaService.revertByScale(step))
      .attr('data-id', this.helper.uuidPolygonForHoleCreator)
      .attr('vector-effect', 'non-scaling-stroke')
      .attr('stroke', this.isPolygonOnAddHoleInFocus() ? Colors.Green : Colors.Red)
      .attr('stroke-width', 1);
  }

  /**
   * Настройка координат для целевого элемента.
   */
  private setTargetCorditnate(): void {
    const target = d3.event.target;
    const targetParent = target.parentElement;
    this.dragVector = {
      x: d3.mouse(target)[0],
      y: d3.mouse(target)[1]
    };
    if (targetParent.getAttribute('transform')) {
      this.dragVector = this.svgNativeHelperService.getPointTransformation(target, this.dragVector);
    }
  }

  /**
   * Получить геометриую.
   * @param layer Слой
   * @return PolygonEditable
   */
  private getGeometry(layer: any): PolygonEditable {
    const polygon = layer.select('path');
    const polygonId = polygon.attr('id');
    const boundCoords: Vector[] = this.handleSave(d3.select(`g#g-${polygonId}`));
    const holeCoords: Vector[][] = [];
    d3.select(`g#h-${polygonId}`).selectAll('g').nodes().forEach((item): void => {
      holeCoords.push(this.handleSave(d3.select(item)));
    });

    return {
      id: polygonId,
      geometry: {
        bound: boundCoords,
        holes: holeCoords
      }
    };
  }

  /**
   * Метод для получения координат объекта.
   * @param layer  guid слоя.
   * @return Vector[].
   */
  private handleSave(layer: any): Vector[] {
    const coordinates: Vector[] = [];
    layer.selectAll('circle').nodes().forEach(
      (item: SVGGraphicsElement, index: number): void => {
        if (index % this.delimiter === 0) {
          const circle = d3.select(item);
          coordinates.push({ x: Number(circle.attr('cx')), y: Number(circle.attr('cy')) });
        }
      });

    return coordinates;
  }

  /**
   * Проверка выбран ли инструмент создание внутрениих контуров в полигонах
   * и находится ли клик в приделах этого объекта.
   * @return  boolean
   */
  private isPolygonOnAddHoleInFocus(): boolean {
    return (d3.event.target.id || d3.event.target.dataset.id) === this.helper.uuidPolygonForHoleCreator
      && this.helper.isActiveHoleCreator;
  }

  /**
   * Закрытие полигона.
   */
  private closePolygon(): void {
    this.svg.select(`g.${EditorСSSClasses.DrawPolygon}`).remove();
    this.editablePolygonPoints.push(
      this.helper.generateIntermediatePoint(
        this.editablePolygonPoints[0],
        this.editablePolygonPoints[this.editablePolygonPoints.length - this.shiftByOne]
      )
    );

    if (!this.helper.isActiveHoleCreator) {
      this.closePolygonMain();
    } else {
      this.closeHole();
    }

    this.editablePolygonPoints = [];
    this.drawing = false;
  }

  /**
   * Закрываем внутренний контур.
   */
  private closeHole(): void {
    const bound: Vector[] = [];
    const holes: Vector[][] = [];
    const circles = d3.select(`g#g-${this.helper.uuidPolygonForHoleCreator}`)
      .selectAll('circle').nodes();
    circles.forEach((item: any, index: number): void => {
      const circle = d3.select(item);
      bound.push({ x: Number(circle.attr('cx')), y: Number(circle.attr('cy')) });
    });
    d3.select(`g#h-${this.helper.uuidPolygonForHoleCreator}`).selectAll('g').nodes().forEach((item): void => {
      const coordinates: Vector[] = [];
      d3.select(item).selectAll('circle').nodes().forEach((crcl, index): void => {
        const circle = d3.select(crcl);
        coordinates.push({ x: Number(circle.attr('cx')), y: Number(circle.attr('cy')) });
      });
      holes.push(coordinates);
    });
    holes.push(this.editablePolygonPoints);
    const polygon: PolygonEditable = this.helper.drawPolygon(bound, holes, this.helper.uuidPolygonForHoleCreator);
    this.helper.generateCircles(polygon.geometry.bound, this.helper.uuidPolygonForHoleCreator, false);
    polygon.geometry.holes.forEach((hole) =>
      this.helper.generateCircles(hole, this.helper.uuidPolygonForHoleCreator, true));
    this.helper.deactivateCreatorHole();
    this.helper.updateSchemaPolygon(polygon);
    super.createOrEditFinishEmit(polygon.id);
  }

  /**
   * Закрываем сам полигон.
   */
  private closePolygonMain(): void {
    const uuid = genUuid.generate();
    this.groupLayer = this.svg.select('g#schema-layer')
      .append('g')
      .classed('tmp-layer', true)
      .attr('data-type', this.objectType)
      .attr('data-id', `g-${uuid}`);
    this.groupLayer.append('path')
      .attr('d', this.lineFunction(this.editablePolygonPoints.map((v) => [v.x, v.y])))
      .attr('id', uuid);
    this.helper.generateCircles(this.editablePolygonPoints, uuid, false);
    this.storageService.addObject(this.objectType, this.getGeometry(d3.select(`g.${EditorСSSClasses.TmpLayer}`)));
    this.svg.select(`g.${EditorСSSClasses.TmpLayer}`).remove();
    setTimeout(() => this.setNewPolygon(uuid));
    this.helper.objectId = uuid;
  }

  /**
   * Настройка нового полигона после добавления в схему.
   * @param uuid id полигона.
   */
  private setNewPolygon(uuid: string): void {
    const nodes = d3.selectAll(`g.${EditorСSSClasses.EditableLayer}`).nodes();
    const layer = nodes[nodes.length - 1];
    const selectedLayer = d3.select(layer);
    selectedLayer.classed(this.editableLayerClassName, true);
    selectedLayer.select('path')
      .classed(EditorСSSClasses.PolygonEditArea, true)
      .classed(this.editableLayerClassName, true)
      .style('fill', Colors.RedLight)
      .attr('id', uuid)
      .on('contextmenu', contextMenu(this.helper.menuForPolygon));
    this.objectId = uuid;
    this.finishCreatePoligonEmit(uuid);
  }

  /**
   *
   * @param uuid id d схеме нового полигона.
   */
  private finishCreatePoligonEmit(uuid: string): void {
    super.createOrEditFinishEmit(uuid);
    this.isCreateFinish = true;
  }
}
