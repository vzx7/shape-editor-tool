import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { AutocadLayersService } from 'modules/objects/services/autocad-layers/autocad-layers.service';
import { AutoCadLayerModalComponent } from '../auto-cad-layer-modal/auto-cad-layer-modal.component';
import { ModalState } from 'modules/shared/interfaces/modal/modal-state';
/**
 * @todo Описать компонент
 */
@Component({
  selector: 'app-auto-cad-layer',
  templateUrl: './auto-cad-layer.component.html',
  styleUrls: ['./auto-cad-layer.component.scss']
})
export class AutoCadLayerComponent implements OnInit {
  /**
   * Модал.
   */
  @ViewChild('modal') public modal: AutoCadLayerModalComponent;

  public isActive: boolean;
  public toolName: ToolNames;
  constructor(
    public autocadLayersService: AutocadLayersService
  ) { }
  public ngOnInit(): void { }

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

  /**
   * Настраиваем активность кнопки на панели.
   * @param modalState Состояение модала.
   */
  public setActive(modalState: ModalState): void {
    this.isActive = modalState.isOpen;
  }
}
