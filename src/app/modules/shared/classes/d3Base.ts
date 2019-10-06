import * as d3lib from 'd3';

/**
 * Базовый класс для работы с D3.
 */
export class D3Base {
  /**
   * Библиотека для визуализации даных.
   */
  protected readonly d3: typeof d3lib;

  /**
   * SVG container.
   */
  protected svg: d3lib.Selection<d3lib.BaseType, {}, HTMLElement, any>;

  constructor() {
    this.d3 = d3lib;
  }

  /**
   * Метод для получения рабочей области (контейнер svg).
   */
  public getSvg(): void {
    this.svg = this.d3.select('svg#main-container');
  }

  /**
   * Отписка от событий.
   * @param eventNames Список событий от которых нужно отписаться.
   */
  public killEventHandlers(eventNames: string[]): void {
    if (this.svg) {
      eventNames.forEach((name) => this.svg.on(name, null));
    }
  }
}
