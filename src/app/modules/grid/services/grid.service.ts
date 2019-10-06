import { EventEmitter, Injectable } from '@angular/core';
import { GridSpacing } from '../enums/grid-spacing.enum';

@Injectable()
export class GridService {
  /**
   * EventEmitter для активации диактивации иснтрументов.
   */
  public isActivated: EventEmitter<boolean>;

  /**
   * EventEmitter для выбора шага сетки
   */
  public stepChoosed: EventEmitter<number>;

  /**
   * Шаг сетки
   */
  public step: GridSpacing;

  constructor() {
    this.isActivated = new EventEmitter<boolean>();
    this.stepChoosed = new EventEmitter<number>();
    this.step = GridSpacing.whole; // Если не выбран шаг;
   }

   public showGrid(step?: number): void {
    this.step = step ? step : this.step;
   }
}
