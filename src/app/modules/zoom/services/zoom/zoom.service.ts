import { Injectable } from '@angular/core';
import { SelectAreaService } from 'modules/shared/services/select-area/select-area.service';
import { WorkAreaService } from 'modules/shared/services/work-area/work-area.service';
import { Vector } from 'modules/shared/interfaces/geometry/vector';

/**
 * Сервис управления масштабом.
 */
@Injectable()
export class ZoomService {

  constructor(
    private readonly selectAreaService: SelectAreaService,
    private readonly workAreaService: WorkAreaService
  ) {}

  /**
   * Активация инструмента.
   */
  public enableZoom(): void {
    this.selectAreaService.enableSelectArea((realMousePos: Vector, startMousePosition: Vector) => {
      this.workAreaService.setViewBoxBounds(realMousePos, startMousePosition);
    });
  }

  /**
   * Деактивация инструмента.
   */
  public disableZoom(): void {
    this.selectAreaService.disableSelectArea();
  }
}
