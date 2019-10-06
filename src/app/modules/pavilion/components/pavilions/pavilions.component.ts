import { Component, ViewChild } from '@angular/core';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { PavilionService } from 'modules/pavilion/services/pavilion.service';
import { Tool } from 'modules/shared/interfaces/tools/tool';
import { ModalState } from 'modules/shared/interfaces/modal/modal-state';
import { PavilionsModalComponent } from '../pavilions-modal/pavilions-modal.component';
import { ModalName } from 'modules/shared/enums/modal-name.enum';

/**
 * Компонент для выбора павилиона
 */
@Component({
  selector: 'app-pavilions',
  templateUrl: './pavilions.component.html',
  styleUrls: ['./pavilions.component.scss']
})
export class PavilionsComponent implements Tool {
  /**
   * Компонент модала.
   */
  @ViewChild('modal') public modal: PavilionsModalComponent;
  public isActive: boolean;
  /**
   * Название модала.
   */
  public toolName: ToolNames;

  /**
   * Лэйбл на кнопке.
   */
  public label: { name: string };
  constructor(
    public pavilionService: PavilionService
  ) {
    this.label = {
      name: 'Павильоны'
    };
  }

  public callHandler(): void {
    if (this.isActive) {
      this.deactivateTool();
    } else {
      this.activateTool();
    }
    this.pavilionService.selectOpened.emit(this.isActive);
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
