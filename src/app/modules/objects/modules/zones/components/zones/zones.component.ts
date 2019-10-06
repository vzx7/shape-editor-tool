import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { ZonesModalComponent } from '../zones-modal/zones-modal.component';

/**
 * Компонент инструмента "Зоны".
 */
@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss']
})
export class ZonesComponent implements OnInit {

  /**
   * Модал
   */
  @ViewChild('modal') public modal: ZonesModalComponent;

  /**
   * Активен ли инструмент
   */
  public isActive: boolean;

  /**
   * Наименование инструмента
   */
  public toolName: ToolNames;

  constructor() { }

  public ngOnInit(): void { }

  /**
   * Обработчик события
   */
  public callHandler(): void {
    if (this.isActive) {
      this.deactivateTool();
    } else {
      this.activateTool();
    }
   }

  /**
   * Активация инструмента
   */
  public activateTool(): void {
    this.isActive = true;
    this.modal.open();
  }

  /**
   * Деактивация инструмента
   */
  public deactivateTool(): void {
    this.isActive = false;
    this.modal.close();
  }
}
