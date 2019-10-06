import { EventEmitter, Injectable } from '@angular/core';
import { Vector } from 'modules/shared/interfaces/geometry/vector';
import { ViewBox } from 'modules/shared/interfaces/geometry/view-box';
import { D3Base } from 'modules/shared/classes/d3Base';
import { UtilitesService } from '../utilites/utilites.service';
import { StorageService } from '../storage/storage.service';

/**
 * Сервис для управления рабочей областью.
 */
@Injectable()
export class WorkAreaService extends D3Base {
  /**
   * Эмиток изминения масштаба.
   */
  public changeScale: EventEmitter<boolean>;

  /**
   * Масштаб.
   */
  private scale: number;

  /**
   * Рабочая область.
   */
  private viewBox: ViewBox;

  /**
   * Ширина SVG элемента.
   */
  private width: number;

  /**
   * Высота SVG элемента.
   */
  private height: number;

  private readonly halfK: number = 2;

  constructor(
    private readonly utilitesService: UtilitesService,
    private readonly storageService: StorageService
  ) {
    super();
    const startScale = 1;
    const startWidth = 100;
    const startHeight = 100;

    this.scale = startScale;
    this.width = startWidth;
    this.height = startHeight;
    this.viewBox = { position: { x: 0, y: 0 }, width: this.width, height: this.height };
    this.changeScale = new EventEmitter<boolean>();
    this.storageService.schemaLoaded.subscribe(() => {
      this.scaleToScheme();
    });
  }

  /**
   * Получить текущую ширину рабочей области.
   * @return ширину рабочей области.
   */
  public getWidth(): number {
    return this.width;
  }

  /**
   * Получить текущую высоту рабочей области.
   * @return высоту рабочей области.
   */
  public getHeight(): number {
    return this.height;
  }

  /**
   * Вернуть масштаб.
   * @return scale.
   */
  public getScale(): number {
    return this.scale;
  }

  /**
   * Задать масштаб рабочей области.
   * @param scale значение масштаба.
   * @param point точка центра.
   */
  public setScale(scale: number, point: Vector = null): void {
    if (!point) {
      point = this.getVBCenter(this.viewBox);
    }

    const viewBoxWidth = this.width / scale;
    const viewBoxHeight = this.height / scale;
    const viewBoxX = point.x - viewBoxWidth / this.halfK;
    const viewBoxY = point.y - viewBoxHeight / this.halfK;

    this.scale = scale;
    this.viewBox = { position: { x: viewBoxX, y: viewBoxY }, width: viewBoxWidth, height: viewBoxHeight };
    this.changeScale.emit(true);
  }

  /**
   * Изменить масштаб на нужное значение.
   * @param scaleIncr коэффициент изменения (-1..infinity].
   * @param point точка центра.
   */
  public setScaleIncr(scaleIncr: number, point: Vector = null): void {
    this.setScale(this.scale * (1 + scaleIncr), point);
  }

  /**
   * Изменение масштаба исходя из прямоугольника заданного двумя вершинами.
   * @param v1 одна из вершин диагонали прямоугольника.
   * @param v2 другая вершина диагонали.
   */
  public setViewBoxBounds(v1: Vector, v2: Vector): void {
    const bBox = this.utilitesService.createBBox(v1, v2);
    this.setViewBox(bBox);
  }

  /**
   * Установить ViewBox для рабочей области.
   * @param viewBox границы отображения.
   */
  public setViewBox(viewBox: ViewBox): void {
    const point = {
      x: viewBox.position.x + viewBox.width / this.halfK,
      y: viewBox.position.y + viewBox.height / this.halfK
    };
    const scale = Math.min(this.width / viewBox.width, this.height / viewBox.height);

    this.setScale(scale, point);
  }

  /**
   * Задать размер рабочей области.
   * @param width ширина рабочей области.
   * @param height высота рабочей области.
   */
  public setScreenSize(width: number, height: number): void {
    this.width = width;
    this.height = height;

    this.viewBox = { position: this.viewBox.position, width: width / this.scale, height: height / this.scale};
  }

  /**
   * Преобразование числа к абсолютному значению (откат зума).
   * @param num число для преобразования.
   * @return Абсолютное значение.
   */
  public revertByScale(num: number): number {
    return num / this.scale || 1;
  }

  /**
   * Получение строки с риверсивным значением масштаба (для SVG элементов).
   * @return строка, которую надо добавить в трансформация SVG элемента.
   */
  public generateRevertedScale(): string {
    if (this.scale === 1) {
      return null;
    }
    const reverted = 1 / this.scale;

    return `scale(${reverted} ${reverted})`;
  }

  /**
   * Генерация строки ViewBox'a.
   * @return строка для SVG.ViewBox.
   */
  public generateViewBox(): string {
    return `${this.viewBox.position.x} ${this.viewBox.position.y} ${this.viewBox.width} ${this.viewBox.height}`;
  }

  /**
   * Возвращает текущую рабочую область.
   * @return текущую рабочую область.
   */
  public getViewBox(): ViewBox {
    return this.viewBox;
  }

  /**
   * Зум на всю схему.
   */
  public scaleToScheme(): void {
    this.getSvg();

    const renderedScheme = this.d3.select('#schema-layer').node() as SVGGElement;

    const schemeBBox = renderedScheme.getBBox();
    const vBoxC = 0.2;
    const viewBox: ViewBox = {
      position: {
        x: schemeBBox.x,
        y: schemeBBox.y },
      width: schemeBBox.width,
      height: schemeBBox.height };

    this.setViewBox(viewBox);
    this.setScaleIncr(-vBoxC);
  }

  /**
   * Получение центра рабочей области.
   * @param viewBox Рабочая область.
   * @return координаты центра.
   */
  private getVBCenter(viewBox: ViewBox): Vector {
    const centerX = viewBox.position.x + viewBox.width / this.halfK;
    const centerY = viewBox.position.y + viewBox.height / this.halfK;

    return { x: centerX, y: centerY};
  }
}
