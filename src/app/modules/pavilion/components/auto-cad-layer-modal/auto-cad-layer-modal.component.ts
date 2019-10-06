import { Component, OnInit } from '@angular/core';
import { BaseModalComponent } from 'modules/shared/components/base-modal/base-modal.component';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AutoCADLayer } from 'modules/objects/interfaces/auto-cad-layers';
import { AutocadLayersService } from 'modules/objects/services/autocad-layers/autocad-layers.service';
import { ModalName } from 'modules/shared/enums/modal-name.enum';

@Component({
  selector: 'app-auto-cad-layer-modal',
  templateUrl: './auto-cad-layer-modal.component.html',
  styleUrls: ['./auto-cad-layer-modal.component.scss']
})
export class AutoCadLayerModalComponent extends BaseModalComponent implements OnInit {

  /**
   * Путь до иконки
   */
  public iconPath: string;
  /**
   * Слои
   */
  public layers: AutoCADLayer;

  constructor(
    public autocadLayersService: AutocadLayersService,
    public ngxSmartModalService: NgxSmartModalService
  ) {
    super(ngxSmartModalService);
    this.iconPath = 'assets/images/icons/switch-off.svg';
    this.initLayers();
  }

  public ngOnInit(): void {
  }

  /**
   * Включение и отключение слоев
   * @param layer Слой
   */
  public switch(layer: string): void {
    if (!this.layers[layer] || this.layers[layer].value === false) {
      this.layers[layer].iconPath = 'assets/images/icons/switch-on-initial.svg';
    } else {
      this.layers[layer].iconPath = 'assets/images/icons/switch-off.svg';
    }
    this.layers[layer].value = !this.layers[layer].value;
  }

  /**
   * Открытие модала
   */
  public open(): void {
    this.openModal(ModalName.AutoCADLayers);
  }

  /**
   * Закрытие модала
   */
  public close(): void {
    this.closeModal(ModalName.AutoCADLayers);
  }

  /**
   * Инициализация слоев
   */
  public initLayers(): void {
    this.layers = {
      hallScheme: {
        value: false,
        iconPath: 'assets/images/icons/switch-off.svg'
      },
      squareClass: {
        value: false,
        iconPath: 'assets/images/icons/switch-off.svg'
      },
      textInfo: {
        value: false,
        iconPath: 'assets/images/icons/switch-off.svg'
      },
      squareFirst: {
        value: false,
        iconPath: 'assets/images/icons/switch-off.svg'
      },
      squareSecond: {
        value: false,
        iconPath: 'assets/images/icons/switch-off.svg'
      },
      ceilingHeight: {
        value: false,
        iconPath: 'assets/images/icons/switch-off.svg'
      },
      outline: {
        value: false,
        iconPath: 'assets/images/icons/switch-off.svg'
      },
      baseLayout: {
        value: false,
        iconPath: 'assets/images/icons/switch-off.svg'
      },
      currentLayout: {
        value: false,
        iconPath: 'assets/images/icons/switch-off.svg'
      }
    };
  }

  /**
   * Обработка события на закрытие модала.
   */
  public onClose(): void {
    this.actionEmit(ModalName.AutoCADLayers, false);
  }
}
