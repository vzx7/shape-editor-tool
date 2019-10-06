import { Component } from '@angular/core';
import { ToolActivateService } from 'modules/shared/services/tool-activate/tool-activate.service';
import { WorkAreaService } from 'modules/shared/services/work-area/work-area.service';

/**
 * Компонент - панель зумирования.
 */
@Component({
  selector: 'app-zoom-panel',
  templateUrl: './zoom-panel.component.html',
  styleUrls: ['./zoom-panel.component.scss']
})
export class ZoomPanelComponent {
  /**
   * Активен ли инструмент.
   */
  public isActive: boolean;

  /**
   * Значение шага изменения маштаба.
   */
  private readonly zoomDelta: number = 0.1;

  constructor(
    protected readonly toolActivateService: ToolActivateService,
    private readonly workAreaService: WorkAreaService
  ) {  }

  /**
   * Приблизить.
   */
  public zoomPlus(): void {
    this.workAreaService.setScaleIncr(this.zoomDelta);
  }

  /**
   * Отдалить.
   */
  public zoomMinus(): void {
    this.workAreaService.setScaleIncr(-this.zoomDelta);
  }
}
