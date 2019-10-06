import { Injectable } from '@angular/core';
import { ViewBox } from 'modules/shared/interfaces/geometry/view-box';
import { Vector } from 'modules/shared/interfaces/geometry/vector';
import { D3Base } from 'modules/shared/classes/d3Base';
import { UtilitesService } from '../utilites/utilites.service';

/**
 * Сервис для выделения произволной области.
 */
@Injectable()
export class SelectAreaService extends D3Base {
  /**
   * Колбэк для обработки события mouseup
   */
  public mouseupCb: Function;

  /**
   * Колбэк для обработки события mousedown
   */
  public mousedownCb: Function;

  /**
   * Начальная позиция старта движения мыши.
   */
  private startMousePosition: Vector;

  /**
   * Рамка выбранной области.
   */
  private selectionRect: SVGRectElement;

  /**
   * Бибокс.
   */
  private viewBox: ViewBox;

  constructor(
    private readonly utilitesService: UtilitesService
  ) {
    super();
  }

  /**
   * Инициализация инструмента выбора области.
   * @param mouseupCb колбэк для обработки события mouseup
   * @param mousedownCb колбэк для обработки события mousedown
   */
  public enableSelectArea(mouseupCb?: Function, mousedownCb?: Function): void {
    this.mouseupCb = mouseupCb;
    this.mousedownCb = mousedownCb;
    super.getSvg();
    this.svg
      .on('mousedown', () => this.mousedownHandler());
  }

  /**
   * Деактивация инструмента.
   */
  public disableSelectArea(): void {
    this.svg
      .on('mousedown', null)
      .on('mousemove', null)
      .on('mouseup', null);

    this.selectionRect = null;
  }

  /**
   * Хэндлер начала выделения.
   */
  private mousedownHandler(): void {
    const mousePos: Vector = { x: this.d3.event.x, y: this.d3.event.y };
    this.startMousePosition = this.utilitesService.getRealVector(mousePos, this.svg.node() as SVGGraphicsElement);
    this.svg
      .on('mousemove', () => this.mousemoveHandler())
      .on('mouseup', () => this.mouseupHandler())
      .on('mousedown', null);

    if (this.mousedownCb) {
      this.mousedownCb();
    }
  }

  /**
   * Хэндлер процесса выделения.
   */
  private mousemoveHandler(): void {
    if (this.d3.event.movementX === 0 && this.d3.event.movementY === 0) {
      return;
    }
    if (!this.selectionRect) {
      this.selectionRect = this.svg
        .append('rect')
        .classed('selection', true)
        .node();
    }

    const mousePos: Vector = { x: this.d3.event.x, y: this.d3.event.y };
    const realMousePos = this.utilitesService.getRealVector(mousePos, this.svg.node() as SVGGraphicsElement);
    this.viewBox = this.utilitesService.createBBox(realMousePos, this.startMousePosition);

    this.d3.select(this.selectionRect)
      .attr('width', this.viewBox.width)
      .attr('height', this.viewBox.height)
      .attr('x', this.viewBox.position.x)
      .attr('y', this.viewBox.position.y)
      .attr('vector-effect', 'non-scaling-stroke');
  }

  /**
   * Зумирование на выбранную область.
   */
  private mouseupHandler(): void {
    this.svg
      .on('mousemove', null)
      .on('mouseup', null)
      .on('mousedown', () => this.mousedownHandler());

    if (!this.selectionRect) {
      return;
    }
    const mousePos: Vector = { x: this.d3.event.x, y: this.d3.event.y };
    const realMousePos = this.utilitesService.getRealVector(mousePos, this.svg.node() as SVGGraphicsElement);

    this.d3.select(this.selectionRect).remove();
    this.selectionRect = null;

    if (this.mouseupCb) {
      this.mouseupCb(realMousePos, this.startMousePosition, this.viewBox);
    }
  }
}
