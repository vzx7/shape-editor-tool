import { Component } from '@angular/core';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { PavilionService } from 'modules/pavilion/services/pavilion.service';
import { Tool } from 'modules/shared/interfaces/tools/tool';
import { ModalState } from 'modules/shared/interfaces/modal/modal-state';

/**
 * Компонент для выбора павилиона
 */
@Component({
  selector: 'app-pavilions',
  templateUrl: './pavilions.component.html',
  styleUrls: ['./pavilions.component.scss']
})
export class PavilionsComponent implements Tool {
  public isActive: boolean;
  /**
   * Название модала.
   */
  public toolName: ToolNames;

  /**
   * Лэйбл на кнопке.
   */
  public label: {name: string};
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
  public activateTool(): void { this.isActive = true; }
  public deactivateTool(): void { this.isActive = false; }

  /**
   * Настраиваем активность кнопки на панели.
   * @param modalState Состояение модала.
   */
  public setActive(modalState: ModalState): void {
    this.isActive = modalState.isOpen;
  }
}
