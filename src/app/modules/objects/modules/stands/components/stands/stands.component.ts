import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { StandsService } from 'modules/shared/services/stands/stands.service';
import { ModalState } from 'modules/shared/interfaces/modal/modal-state';
import { Tool } from 'modules/shared/interfaces/tools/tool';
import { StandListComponent } from '../stand-list/stand-list.component';

/**
 * Компонент инструмента "Стенды".
 */
@Component({
  selector: 'app-stands',
  templateUrl: './stands.component.html',
  styleUrls: ['./stands.component.scss']
})
export class StandsComponent implements Tool {
  /**
   * Модал.
   */
  @ViewChild('modal') public modal: StandListComponent;

  public isActive: boolean;

  /**
   * Название компонента.
   */
  public toolName: ToolNames;

  constructor(
    public standsService: StandsService,
  ) { }

  /**
   * Метод для обработки вызовов иснтрумента.
   */
  public callHandler(): void {
    if (this.isActive) {
      this.deactivateTool();
    } else {
      this.activateTool();
    }
  }

  public activateTool(): void {
    this.isActive = true;
    this.modal.open();
  }

  public deactivateTool(): void {
    this.isActive = false;
    this.modal.close();
  }
  /**
   * Настраиваем активность кнопки на панели.
   * @param modalState Состояение модала.
   */
  public setActive(modalState: ModalState): void {
    this.isActive = modalState.isOpen;
  }
}
