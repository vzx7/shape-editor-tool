import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { WorkingSchemeLayers } from 'modules/objects/interfaces/working-scheme-layers';
import { ToolEntity } from 'modules/shared/classes/tool-entity';
import { ToolActivateService } from 'modules/shared/services/tool-activate/tool-activate.service';
import { LayersService } from '../../services/layers/layers.service';
import { LayersModalComponent } from '../layers-modal/layers-modal.component';

/**
 * Компонент инструмента "Слои".
 */
@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.scss']
})
export class LayersComponent extends ToolEntity implements OnInit {

  /**
   * Модал.
   */
  @ViewChild('modal') public modal: LayersModalComponent;

  /**
   * ПРоверка активиности
   */
  public isActive: boolean;

  /**
   * Слои рабочей схемы
   */
  public workingSchemeLayers: WorkingSchemeLayers;

  /**
   * Путь до иконки
   */
  public iconPath: string;

  constructor(
    public layersService: LayersService,
    protected readonly toolActivateService: ToolActivateService
  ) {
    super(toolActivateService, ToolNames.LayersTool);
    this.iconPath = 'assets/images/icons/switch-off.svg';
  }
  public ngOnInit(): void { }

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
    this.emitActivate();
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
   * Переключение
   * @param type Тип слоя
   * @param layer Слой
   */
  public switch(type: string, layer: string): void {
    if (this.workingSchemeLayers[type][layer] === false) {
      this.iconPath = 'assets/images/icons/switch-on.svg';
    } else {
      this.iconPath = 'assets/images/icons/switch-off.svg';
    }
    this.workingSchemeLayers[type][layer] = !this.workingSchemeLayers[type][layer];
  }
}
