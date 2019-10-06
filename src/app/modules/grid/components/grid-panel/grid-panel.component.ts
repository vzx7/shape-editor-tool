import { Component, OnInit } from '@angular/core';
import { GridService } from '../../services/grid.service';
import { GridSpacing } from '../../enums/grid-spacing.enum';

@Component({
  selector: 'app-grid-panel',
  templateUrl: './grid-panel.component.html',
  styleUrls: ['./grid-panel.component.scss']
})
export class GridPanelComponent implements OnInit {

  /**
   * Активирована ли сетка
   */
  public isActive: boolean;

  /**
   * Шаг сетки
   */
  public step: GridSpacing;

  /**
   * Шаг сетки (параметры)
   */
  public gridSpacing: typeof GridSpacing;

  /**
   * @param gridService Сервис для управления сеткой
   */
  constructor(
    private readonly gridService: GridService,
  ) {
    this.gridSpacing = GridSpacing;
    this.gridService.isActivated.subscribe((value: boolean) => {
      this.isActive = value;
    });
  }

  public ngOnInit(): void {
  }

  /**
   * Показ сетки
   * @param step шаг
   */
  public showGrid(step?: number): void {
    this.step = step || GridSpacing.whole;
    this.isActive = step ? true : !this.isActive;
    this.gridService.isActivated.emit(this.isActive);
    this.gridService.stepChoosed.emit(step);
  }
}
