import { ObjectsHostService } from '../../../shared/services/objects-host/objects-host.service';
import { Injectable } from '@angular/core';
import { D3Base } from 'modules/shared/classes/d3Base';
import * as d3 from 'd3';
import { Vector } from 'modules/shared/interfaces/geometry/vector';
import {
  TransformationHelperService
} from 'modules/shared/services/transformation-helper/transformation-helper.service';
import { SvgNativeHelperService } from '../svg-native-helper/svg-native-helper.service';
import { EditorMode } from 'modules/shared/enums/editor-mode.enum';
import { EditorState } from 'modules/shared/interfaces/editor/editor-state';
import { Colors } from 'modules/shared/enums/colors.enum';
import { EditorСSSClasses } from 'modules/editor/enums/editorсssclasses.enum';
import { WorkAreaService } from 'modules/shared/services/work-area/work-area.service';

@Injectable()
export class RotatorService extends D3Base {
  /**
   * Режим редактора.
   */
  private editorMode: EditorMode;
  /**
   * Селектор элементов, которые можно вращать.
   */
  private rotatedObjectSelector: string;

  /**
   * Слой для служебных элементов управления.
   */
  private serviceContainer: SVGGElement;

  constructor(
    private readonly objectsHost: ObjectsHostService,
    private readonly transformationService: TransformationHelperService,
    private readonly svgTransformationHelper: SvgNativeHelperService,
    private readonly workAreaService: WorkAreaService
  ) {
    super();
    this.workAreaService.changeScale.subscribe(() => {
      this.changeRotatorScale();
    });
  }

  /**
   * Включение инструмента вращения объекта.
   * @param editorState Состояние редактора.
   */
  public enableRotation(editorState: EditorState): void {
    this.editorMode = editorState.editorMode;
    super.getSvg();

    if (editorState.objectId && this.editorMode === EditorMode.Update) {
      this.rotatedObjectSelector = EditorСSSClasses.OneEditableLayer;
    } else if (this.editorMode === EditorMode.Create) {
      this.rotatedObjectSelector = EditorСSSClasses.NewPolygon;
    } else {
      this.rotatedObjectSelector = EditorСSSClasses.RotatableElement;
    }

    this.serviceContainer = this.svg.append('g').node();
    const containers = d3.selectAll(`.${this.rotatedObjectSelector}`);
    containers.on('click', this.setRotation.bind(this))
      .select('path')
      .style('fill', Colors.RedLight)
      .classed('polygon-edit-area', true);
  }

  /**
   * Настройка объекта ротации.
   */
  public setRotation(): void {
    let target;
    const me = d3.event as MouseEvent;
    if (me) {
      target = me.target as SVGGraphicsElement;
      d3.select(target).classed(EditorСSSClasses.RotatorElementSelected, true);
    } else {
      target = d3.select(`.${EditorСSSClasses.RotatorElementSelected}`).node();
    }

    if (!target) { return; }

    const parentNode = this.objectsHost.getObjectNode(target);
    const bbox = (parentNode as SVGGraphicsElement).getBBox();
    const center = this.getBoundingBoxCenter(bbox);
    const obj = this.objectsHost.getObject(parentNode);

    if (this.transformationService.hasRotation(obj.geometry)) {
      this.transformationService.setRotationCenter(obj.geometry, center);
    }
    this.removeSelectionControls();
    const rotator = this.createRotateControls(
      bbox,
      center,
      d3.select(parentNode).attr('transform')
    );

    let azimuthOffset = 0;

    const virtualCenter = this.transformationService
      .addVector(center, this.transformationService.getTranslation(obj.geometry));

    d3.select(rotator).call(
      d3.drag()
        .on('start', () => {
          let mousePosition: Vector = {
            x: d3.event.sourceEvent.x,
            y: d3.event.sourceEvent.y
          };

          mousePosition = this.svgTransformationHelper.getRealVector(mousePosition, target);

          const startVector = this.transformationService.decrVector(mousePosition, virtualCenter);

          const azimuth = this.transformationService.calcAzimuth(startVector);

          azimuthOffset = azimuth - this.transformationService.getRotation(obj.geometry).angle;
        })
        .on('drag', () => {
          let mousePosition: Vector = {
            x: d3.event.sourceEvent.x,
            y: d3.event.sourceEvent.y
          };

          mousePosition = this.svgTransformationHelper.getRealVector(mousePosition, target);

          const startVector = this.transformationService.decrVector(mousePosition, virtualCenter);
          const azimuth = this.transformationService.calcAzimuth(startVector);

          const angle = azimuth - azimuthOffset;

          this.transformationService.setRotation(obj.geometry, {
            point: center,
            angle: angle
          });

          d3.select(this.serviceContainer).attr(
            'transform',
            this.transformationService.generateTransformation(obj.geometry)
          );
        })
    );
  }

  /**
   * Отключение интструмента вращения объекта.
   */
  public disableRotation(): void {
    this.killGroupEventHandlers();
    this.removeSelectionControls();
    d3.select(this.serviceContainer).remove();
    d3.select(`.${EditorСSSClasses.PolygonEditArea}`)
    .style('fill', null)
    .classed(EditorСSSClasses.PolygonEditArea, false);
  }

  /**
   * Создание элементов управления для вращения элемента.
   * @param bbox Bbox элемента.
   * @param center Центр элемента.
   * @param transform Начальная трансформация элемента.
   * @return Элемент, за который надо тянуть для вращения.
   */
  private createRotateControls(
    bbox: DOMRect,
    center: Vector,
    transform: string
  ): SVGGraphicsElement {
    const half = 0.5;

    const draggableSquareSize = 15;
    const distanseToDrag = 50;
    const lineY = center.y - bbox.height * half;

    const controlsGroup = d3
      .select(this.serviceContainer)
      .attr('transform', transform);

    controlsGroup
      .append('rect')
      .attr('x', bbox.x)
      .attr('y', bbox.y)
      .attr('width', bbox.width)
      .attr('height', bbox.height)
      .attr('vector-effect', 'non-scaling-stroke')
      .style('fill', 'none')
      .style('stroke', 'black')
      .classed(EditorСSSClasses.RotatorBorderUtil, true);

    controlsGroup
      .append('line')
      .attr('x1', center.x)
      .attr('y1', lineY)
      .attr('x2', center.x)
      .attr('y2', lineY - this.workAreaService.revertByScale(distanseToDrag))
      .attr('vector-effect', 'non-scaling-stroke')
      .style('stroke', 'black')
      .classed(EditorСSSClasses.RotatorLineUtil, true);

    const res = controlsGroup
      .append('rect')
      .attr('x', center.x - this.workAreaService.revertByScale(draggableSquareSize * half))
      .attr('y', lineY - this.workAreaService.revertByScale(distanseToDrag + draggableSquareSize * half))
      .attr('width', this.workAreaService.revertByScale(draggableSquareSize))
      .attr('height', this.workAreaService.revertByScale(draggableSquareSize))
      .attr('vector-effect', 'non-scaling-stroke')
      .style('fill', 'black')
      .classed(EditorСSSClasses.RotatorRectUtil, true);

    return res.node();
  }

  /**
   * Удаление обработчика клика по группам.
   */
  private killGroupEventHandlers(): void {
    d3.selectAll(`.${this.rotatedObjectSelector}`).on('click', null);
  }

  /**
   * Удаление элементов управления.
   */
  private removeSelectionControls(): void {
    if (this.serviceContainer) {
      d3.select(this.serviceContainer)
        .selectAll('*')
        .remove();
    }
  }

  /**
   * Получение координат центра Bbox'а.
   * @param bbox Bbox.
   * @return Координаты центра Bbox'а.
   */
  private getBoundingBoxCenter(bbox: DOMRect): Vector {
    const half = 0.5;

    return { x: bbox.x + bbox.width * half, y: bbox.y + bbox.height * half };
  }

  /**
   * Изменяем масштаб элементов управления ротатора.
   */
  private changeRotatorScale(): void {
    this.removeSelectionControls();
    this.setRotation();
  }
}
