import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { UtilitesService } from 'modules/shared/services/utilites/utilites.service';
import { PolygonEditable } from 'modules/editor/interfaces/polygon-editable';
import { PathFragmentType } from 'modules/editor/enums/path-fragment-type.enum';
import { PainterEntity } from 'modules/editor/classes/painter-entity';
import { Colors } from 'modules/shared/enums/colors.enum';
import * as contextMenu from 'd3-context-menu';
import { ContextMenu } from 'modules/editor/interfaces/context-menu';
import {
  TransformationHelperService
} from '../../../shared/services/transformation-helper/transformation-helper.service';
import { ObjectsHostService } from 'modules/shared/services/objects-host/objects-host.service';
import { EditorСSSClasses } from 'modules/editor/enums/editorсssclasses.enum';
import { EditorStateService } from 'modules/shared/services/editor-state/editor-state.service';
import { EditorState } from 'modules/shared/interfaces/editor/editor-state';
import { StorageService } from 'modules/shared/services/storage/storage.service';
import { Polygon } from 'modules/shared/interfaces/geometry/polygon';
import { Vector } from 'modules/shared/interfaces/geometry/vector';
import { WorkAreaService } from 'modules/shared/services/work-area/work-area.service';

/**
 * Вспомогательный сервес для редактирования полигона.
 */
@Injectable()
export class PainterHelperService extends PainterEntity {
  /**
   * Меню для точки в инструменте создания/редактирования объектов.
   */
  public menuForPoint: ContextMenu[];
  /**
   * Меню для полигона в инструменте создания/редактирования объектов.
   */
  public menuForPolygon: ContextMenu[];

  /**
   * Если инструмент рисование контуров внутри  активен.
   */
  public isActiveHoleCreator: boolean;
  /**
   * uuid полигона, для каторого активирован инструмент рисования дырок внутри.
   */
  public uuidPolygonForHoleCreator: string;

  /**
   * Id редактируемого объетоа.
   */
  public objectId: string;

  /**
   * Класс для вспомогательных точек, при перемещение.
   */
  private readonly classForIntermadiatePointDragged: string = 'intermediate-point-dragged';
  constructor(
    private readonly utilitesService: UtilitesService,
    private readonly transformationService: TransformationHelperService,
    private readonly hostService: ObjectsHostService,
    protected readonly editorStateService: EditorStateService,
    private readonly storageService: StorageService,
    private readonly workAreaService: WorkAreaService
  ) {
    super(editorStateService);
    // disabled потому что теряется контекст
    // tslint:disable-next-line:no-this-assignment
    const self = this;
    this.menuForPoint = [
      {
        title: 'Удалить точку',
        action: function (): void {
          const circle = self.d3.select(this);
          const circles = self.d3.select(this.parentNode).selectAll('circle').nodes();
          const index = Number(circle.node().dataset.index);
          const layer = self.d3.select(this.parentNode);
          circle.remove();
          self.removeIntermediatePoints(circles, index);
          const polygon = self.renderPolygon(layer, true);
          self.resetCircles(layer);
          self.updateSchemaPolygon(polygon);
          self.createOrEditFinishEmit(polygon.id);
        }
      },
      {
        title: 'Добавить контур внутри',
        disabled: true
      }
    ];

    this.menuForPolygon = [
      {
        title: 'Удалить точку',
        disabled: true
      },
      {
        title: 'Добавить контур внутри',
        action: function (): void {
          self.getSvg();
          const polygon = self.d3.select(this);
          const polygonUuid = polygon.attr('id');
          polygon
            .style('fill', Colors.Fuchsia)
            .classed(EditorСSSClasses.CreateHoleActive, true);
          self.uuidPolygonForHoleCreator = polygonUuid;
          self.isActiveHoleCreator = true;
        }
      }
    ];

    this.workAreaService.changeScale.subscribe(() => {
      this.changeScaleforCircle(EditorСSSClasses.IntermediatePoint, this.intermediatePointRadius);
      this.changeScaleforCircle(EditorСSSClasses.MainPoint, this.radiusPoint);
    });
  }

  /**
   * Передаем состояние редактора.
   * @param editorState состояние редактора.
   */
  public setEditorState(editorState: EditorState): void {
    this.objectType = editorState.objectType;
    this.editorMode = editorState.editorMode;
    this.objectId = editorState.objectId;
  }

  /**
   * Метод для удаления двух промежуточных точек рядом с главной.
   * @param circles Масив точек.
   * @param index индекс главной точки.
   */
  public removeIntermediatePoints(circles: any[], index: number): void {
    const countCircles = circles.length;
    const prevPointIndex = index > 0 ? index - 1 : countCircles - 1;
    const nextPoitnIndex = index === countCircles ? 0 : index + 1;

    this.removeIntervediatePoint(circles, prevPointIndex);
    this.removeIntervediatePoint(circles, nextPoitnIndex);
  }

  /**
   * Метод для настройки контейнеров для бизнес-сущностей.
   * @param uuid Уникальный идентификатор объекта.
   * @param isHole Если это контур внутри полигона.
   * @param isPivotContainerClean Нужно ли очищать контейнер.
   * @return Selection
   */
  public prepareContainers(uuid: string, isHole: boolean, isPivotContainerClean: boolean): any {
    const transformation = this.getTransformation(uuid);
    let pivotPointLayer: any;

    if (!isHole) {
      pivotPointLayer = d3.select(`g#g-${uuid}`);

      if (pivotPointLayer.empty()) {
        pivotPointLayer = d3.select(`g.${EditorСSSClasses.PivotPointLayer}`).append('g')
          .attr('id', `g-${uuid}`)
          .attr('transform', transformation)
          .attr('data-type', PathFragmentType.Bound);
      }

      const holeContainer = d3.select(`g#h-${uuid}`);

      if (holeContainer.empty()) {
        d3.select(`g.${EditorСSSClasses.PivotPointLayer}`).append('g')
          .attr('id', `h-${uuid}`);
      } else if (isPivotContainerClean) {
        holeContainer.selectAll('g').remove();
      }
    } else {
      pivotPointLayer = d3.select(`g#h-${uuid}`).append('g')
        .attr('data-type', PathFragmentType.Hole)
        .attr('transform', transformation)
        .attr('data-id', uuid);
    }
    if (isPivotContainerClean) {
      pivotPointLayer.selectAll('circle').remove();
    }

    return pivotPointLayer;
  }

  /**
   * Получить трансформацию.
   * @param uuid ID полигона.
   * @return вернет трансформацию.
   */
  public getTransformation(uuid: string): string {
    const polygon = d3.select(`path#${uuid}`).node() as HTMLElement;
    const obj = this.hostService.getObject(polygon.parentNode);
    if (obj) {
      return this.transformationService.generateTransformation(obj.geometry);
    }

    return '';
  }

  /**
   * Метод для перестройки полигона, после завершения редактирования.
   * @param layer Слой.
   * @param isMain Если событие вызывается для базовой точки.
   * @return Polygon
   */
  public renderPolygon(layer: any, isMain: boolean): PolygonEditable {
    const layerType: PathFragmentType = layer.attr('data-type');
    const holeCoords: Vector[][] = [];
    let boundCoords: Vector[] = [];
    let layerId: string;
    let boundLayer: any;
    let polygonId: string;

    if (layerType === PathFragmentType.Hole) {
      boundLayer = d3.select(`g#g-${layer.attr('data-id')}`);
      polygonId = layer.attr('data-id');
    } else {
      boundLayer = layer;
      layerId = layer.attr('id');
      polygonId = layerId.replace(/^g-/, '');
    }

    boundCoords = this.getCoordinates(boundLayer, isMain);
    d3.select(`g#h-${polygonId}`).selectAll('g').nodes().forEach((item): void => {
      const holeLayer = d3.select(item);
      holeCoords.push(this.getCoordinates(holeLayer, isMain));
    });

    return this.drawPolygon(boundCoords, holeCoords, polygonId);
  }

  /**
   * Метод для создания следующей после основного узла опорной точки.
   * @param circles Массив с circl.
   * @param currentCircle Текущая circle.
   * @param index Индекс текущей объекта в масиве.
   * @return Массив x,y.
   */
  public createNextIntermadietePoint(
    circles: d3.BaseType[],
    currentCircle: d3.Selection<d3.BaseType, {}, null, undefined>,
    index: number
  )
    : Vector {
    let nextCircle = d3.select(circles[index + this.shiftByOne]);
    if (nextCircle.empty()) {
      nextCircle = d3.select(circles[0]);
    }

    return this.generateIntermediatePoint(
      { x: Number(currentCircle.attr('cx')), y: Number(currentCircle.attr('cy')) },
      { x: Number(nextCircle.attr('cx')), y: Number(nextCircle.attr('cy')) }
    );
  }

  /**
   * Метод для вставки промежуточных узлов.
   * @param firstPoint Массив координат x,y.
   * @param lastPoint Массив координат x,y.
   * @return number[].
   */
  public generateIntermediatePoint(firstPoint: Vector, lastPoint: Vector): Vector {
    const x = (firstPoint.x + lastPoint.x) / this.delimiter;
    const y = (firstPoint.y + lastPoint.y) / this.delimiter;

    return { x, y };
  }

  /**
   * Метод для генерации опорных узлов полигона.
   * @param circPoints Массив координат для узлов полигона.
   * @param uuid Уникальный идентификатор объекта.
   * @param isHole Если это контур внутри полигона.
   * @param isPivotContainerClean Если это контур внутри полигона.
   */
  public generateCircles(circPoints: Vector[], uuid: string, isHole: boolean, isPivotContainerClean: boolean = true)
    : void {
    const pivotPointLayer = this.prepareContainers(uuid, isHole, isPivotContainerClean);
    let isMainPointDragged: boolean;
    let dragCircle: any;
    /**
     * Метод для обработки начала перетаскивания узлов.
     */
    const handleDragStart = (): void => {
      dragCircle = d3.select(d3.event.sourceEvent.target);

      if (dragCircle.classed(EditorСSSClasses.MainPoint)) {
        const index = Number(dragCircle.node().dataset.index);
        const circles = d3.select(dragCircle.node().parentNode).selectAll('circle').nodes();
        this.removeIntermediatePoints(circles, index);
      }
    };

    /**
     * Хэндлер для перетаскивания узлов (процесс).
     */
    const handleDrag = (): void => {
      if (this.drawing) { return; }

      const layer = d3.select(dragCircle.node().parentNode);

      this.dragging = true;

      if (dragCircle.classed(EditorСSSClasses.IntermediatePoint)) {
        dragCircle.classed(this.classForIntermadiatePointDragged, true);
      } else if (dragCircle.classed(EditorСSSClasses.MainPoint)) {
        isMainPointDragged = true;
      }

      dragCircle
        .attr('cx', d3.event.x)
        .attr('cy', d3.event.y)
        .attr('vector-effect', 'non-scaling-stroke');

      setPolygon(layer, false);
    };

    /**
     * Хэндлер для перетаскивания узлов (финишь).
     */
    const handleDragEnd = (): void => {
      this.dragging = false;
      const layer = d3.select(dragCircle.node().parentNode);
      const polygon = setPolygon(layer, true);
      this.updateSchemaPolygon(polygon);
    };

    /**
     * Метод для построения полигонов и узлов вершин полигонов.
     * @param layer Слой.
     * @param isDragEnd Если это завершение перетаскивания.
     * @return PolygonEditable
     */
    const setPolygon = (layer: any, isDragEnd: boolean): PolygonEditable => {
      const polygon = this.renderPolygon(layer, isMainPointDragged);
      if (isDragEnd) {
        this.generateCircles(polygon.geometry.bound, polygon.id, false);
        polygon.geometry.holes.forEach((hole) => this.generateCircles(hole, polygon.id, true));
      }

      return polygon;
    };

    const dragger = d3.drag()
      .on('drag', handleDrag)
      .on('start', handleDragStart)
      .on('end', handleDragEnd.bind(this));

    circPoints.forEach((item, index) => {
      if (index % this.delimiter !== 0) {
        pivotPointLayer
          .append('circle')
          .attr('cx', item.x)
          .attr('cy', item.y)
          .attr('fill', Colors.Red)
          .attr('stroke', Colors.Gray)
          .attr('is-handle', 'true')
          .attr('data-index', index)
          .attr('vector-effect', 'non-scaling-stroke')
          .style('cursor', 'move')
          .call(dragger)
          .attr('r', this.workAreaService.revertByScale(this.intermediatePointRadius))
          .classed(EditorСSSClasses.IntermediatePoint, true);
      } else {
        pivotPointLayer
          .append('circle')
          .attr('cx', item.x)
          .attr('cy', item.y)
          .attr('fill', Colors.Red)
          .attr('stroke', Colors.Gray)
          .attr('vector-effect', 'non-scaling-stroke')
          .attr('data-index', index)
          .attr('is-handle', 'true')
          .style('cursor', 'move')
          .call(dragger)
          .attr('r', this.workAreaService.revertByScale(this.radiusPoint))
          .classed(EditorСSSClasses.MainPoint, true)
          .on('contextmenu', contextMenu(this.menuForPoint));
      }
    });
  }

  /**
   * Диактивация интсрумента создания отверстий в полигонах.
   */
  public deactivateCreatorHole(): void {
    d3.select(`path#${this.uuidPolygonForHoleCreator}`)
      .style('fill', Colors.RedLight)
      .classed(EditorСSSClasses.CreateHoleActive, false);
    this.isActiveHoleCreator = false;
    this.uuidPolygonForHoleCreator = null;
  }

  /**
   * Метод для отображения полигона.
   * @param bound Координаты границ
   * @param holes Координатя дыр.
   * @param polygonId uuid полигона
   * @return PolygonEditable
   */
  public drawPolygon(bound: Vector[], holes: Vector[][], polygonId: string): PolygonEditable {
    const polygon: PolygonEditable = {
      id: polygonId,
      geometry: {
        bound,
        holes
      }
    };

    d3.select(`path#${polygonId}`)
      .attr('d', this.utilitesService.polygonToPath(polygon.geometry))
      .style('fill', Colors.RedLight)
      .attr('fill-rule', 'evenodd')
      .attr('vector-effect', 'non-scaling-stroke')
      .on('contextmenu', contextMenu(this.menuForPolygon));

    return polygon;
  }

  /**
   * Завершить редактирование.
   * @param id Id полигона.
   */
  public editingFinish(): void {
    d3.select(`.${EditorСSSClasses.OneEditableLayer}`).classed(EditorСSSClasses.OneEditableLayer, false);
  }

  /**
   * Сохранить изменение полигона.
   * @param polygon Полигон.
   */
  public updateSchemaPolygon(polygon: PolygonEditable): void {
    const obj = this.storageService.getObject(this.objectType, this.objectId);
    (<Polygon>obj.geometry).bound = polygon.geometry.bound.filter((item, index) => index % this.delimiter === 0);
    const holes: Vector[][] = [];
    polygon.geometry.holes.forEach((item) => {
      holes.push(item.filter((h, index) => index % this.delimiter === 0));
    });
    (<Polygon>obj.geometry).holes = holes;
    super.createOrEditFinishEmit(polygon.id);
  }

  /**
   * Изменить масштаб радиуса для опорных узлов.
   * @param className Класс точки.
   * @param radius Радиус.
   */
  private changeScaleforCircle(className: EditorСSSClasses, radius: number): void {
    d3.selectAll(`.${className}`).attr('r', this.workAreaService.revertByScale(radius));
  }

  /**
   * Метод для сбора координта.
   * @param layer Слой.
   * @param isMainPoint Если это координаты нужны для базовой точки.
   * @return number[][]
   */
  private getCoordinates(layer: any, isMainPoint: boolean): Vector[] {
    const coordinates: Vector[] = [];
    if (isMainPoint) {
      this.getCoordinatesForMainPoints(layer, coordinates);
    } else {
      this.getCoordinatesForIntermediatePoints(layer, coordinates);
    }

    return coordinates;
  }

  /**
   * Получить коордианаты для главных точек.
   * @param layer слой
   * @param coordinates массив координат.
   */
  private getCoordinatesForIntermediatePoints(layer: any, coordinates: Vector[]): void {
    const circles = layer.selectAll('circle').nodes();
    circles.forEach((item: d3.BaseType, index: number) => {
      const circle = d3.select(item);
      coordinates.push({ x: Number(circle.attr('cx')), y: Number(circle.attr('cy')) });
      if (circle.classed(this.classForIntermadiatePointDragged)) {
        const prevCircle = d3.select(circles[index - this.shiftByOne]);
        const prevPoint =
          this.generateIntermediatePoint(
            { x: Number(prevCircle.attr('cx')), y: Number(prevCircle.attr('cy')) },
            { x: Number(circle.attr('cx')), y: Number(circle.attr('cy')) }
          );
        const pop = coordinates.pop();
        coordinates.push(prevPoint);
        coordinates.push(pop);
        coordinates.push(this.createNextIntermadietePoint(circles, circle, index));
      }
    });
  }

  /**
   * Получить коордианаты для промежуточных точек.
   * @param layer слой
   * @param coordinates массив координат.
   */
  private getCoordinatesForMainPoints(layer: any, coordinates: Vector[]): void {
    const circles = layer.selectAll(`circle.${EditorСSSClasses.MainPoint}`).nodes();
    circles.forEach((item: d3.BaseType, index: number) => {
      const circle = d3.select(item);
      coordinates.push({ x: Number(circle.attr('cx')), y: Number(circle.attr('cy')) });
      coordinates.push(this.createNextIntermadietePoint(circles, circle, index));
    });
  }

  /**
   * Метод для удаления промежуточной точки.
   * @param circles  точки.
   * @param poitnIndex Индекс удаляемой точки.
   */
  private removeIntervediatePoint(circles: any[], poitnIndex: number): void {
    const intermadiatePoint = circles.find((d: HTMLElement) => {
      return Number(d.dataset.index) === poitnIndex;
    });
    d3.select(intermadiatePoint).remove();
  }

  /**
   * Метод для пересоздания опорных точек.
   * @param layer Слой.
   */
  private resetCircles(layer: any): void {
    let uuid: string;
    if (layer.attr('data-type') === PathFragmentType.Hole) {
      uuid = layer.attr('data-id').replace(/^h-/, '');
      layer = d3.select(`g#g-${uuid}`);
    } else {
      uuid = layer.attr('id').replace(/^g-/, '');
    }
    this.renderLayer(layer.node(), uuid, false);
    d3.select(`g#h-${uuid}`).selectAll('g').nodes()
      .forEach((item) => {
        this.renderLayer(item, uuid, true);
      });
  }

  /**
   * Метод для отрисовки конретного слоя опорных точек.
   * @param node Узел слоя.
   * @param uuid UUID
   * @param isHole Если отрисовывается слой внутреннего контура.
   */
  private renderLayer(node: any, uuid: string, isHole: boolean): void {
    const layer = d3.select(node);
    const coordinates: Vector[] = [];
    const nodes = layer.selectAll(`circle.${EditorСSSClasses.MainPoint}`).nodes();
    nodes.forEach((item, index) => {
      const circle = d3.select(item);
      coordinates.push({ x: Number(circle.attr('cx')), y: Number(circle.attr('cy')) });
      coordinates.push(this.createNextIntermadietePoint(nodes, circle, index));
    });
    layer.remove();
    this.generateCircles(coordinates, uuid, isHole, false);
  }
}
