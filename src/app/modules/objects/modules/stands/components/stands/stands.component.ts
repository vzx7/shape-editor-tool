import { Component, OnInit } from '@angular/core';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { StandsService } from 'modules/shared/services/stands/stands.service';
import { ModalState } from 'modules/shared/interfaces/modal/modal-state';
import { Tool } from 'modules/shared/interfaces/tools/tool';
import { StorageService } from 'modules/shared/services/storage/storage.service';

/**
 * Компонент инструмента "Стенды".
 */
@Component({
  selector: 'app-stands',
  templateUrl: './stands.component.html',
  styleUrls: ['./stands.component.scss']
})
export class StandsComponent implements Tool {
  public isActive: boolean;
  /**
   * Название компонента.
   */
  public toolName: ToolNames;

  constructor(
    public standsService: StandsService,
    private readonly storageService: StorageService
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
    this.standsService.isActivated.emit(this.isActive);
  }

  public activateTool(): void {
    this.isActive = true;
  }

  public deactivateTool(): void {
    this.isActive = false;
  }
  /**
   * Настраиваем активность кнопки на панели.
   * @param modalState Состояение модала.
   */
  public setActive(modalState: ModalState): void {
    this.isActive = modalState.isOpen;
  }
}
