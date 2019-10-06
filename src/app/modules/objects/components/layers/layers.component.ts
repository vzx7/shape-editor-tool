import { Component, OnInit } from '@angular/core';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { Subject } from 'rxjs';
import { LayersService } from 'modules/objects/services/layers/layers.service';
import { WorkingSchemeLayers } from 'modules/objects/interfaces/working-scheme-layers';

/**
 * Компонент инструмента "Слои".
 */
@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.scss']
})
export class LayersComponent implements OnInit {
  /**
   * ПРоверка активиности
   */
  public isActive: boolean;

  /**
   * Наименования инструментов
   */
  public toolName: ToolNames;

  /**
   * Слои рабочей схемы
   */
  public workingSchemeLayers: WorkingSchemeLayers;

  /**
   * Путь до иконки
   */
  public iconPath: string;

  constructor(
    public layersService: LayersService
    ) {
      this.iconPath = 'assets/images/icons/switch-off.svg';
    }
  public ngOnInit(): void { }
  public callHandler(): void {
    if (this.isActive) {
      this.deactivateTool();
    } else {
      this.activateTool();
    }
    this.layersService.isLayersActive.emit(this.isActive);
   }
  public activateTool(): void { this.isActive = true; }
  public deactivateTool(): void { this.isActive = false; }

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
