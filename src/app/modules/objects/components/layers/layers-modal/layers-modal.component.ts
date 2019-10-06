import { Component, OnInit } from '@angular/core';
import { BaseModalComponent } from 'modules/shared/components/base-modal/base-modal.component';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { LayersService } from 'modules/objects/services/layers/layers.service';
import { WorkingSchemeLayers } from 'modules/objects/interfaces/working-scheme-layers';
import { ModalName } from 'modules/shared/enums/modal-name.enum';

@Component({
  selector: 'app-layers-modal',
  templateUrl: './layers-modal.component.html',
  styleUrls: ['./layers-modal.component.scss']
})
export class LayersModalComponent extends BaseModalComponent implements OnInit {

  /**
   * Путь до иконки
   */
  public iconPath: string;

  /**
   * Путь до иконки
   */
  public isActive: boolean;

  /**
   * Слои
   */
  public workingSchemeLayers: WorkingSchemeLayers;

  /**
   * Путь до иконки
   */
  public buttonText: string;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public layersService: LayersService
  ) {
    super(ngxSmartModalService);
    this.initLayers();
    this.layersService.isLayersActive.subscribe((value: boolean) => {
      this.open(value);

    });
    this.iconPath = 'assets/images/icons/switch-off.svg';
    this.workingSchemeLayers.masterPlanOnly = false;
    this.buttonText = 'Показать только Мастер-план';
  }

  public ngOnInit(): void {
  }

  /**
   * Открытие и закрытие модала
   * @param value Открыт ли он
   */
  public open(value: boolean): void {
    if (value === true) {
      this.openModal(ModalName.Layers);
    } else {
      this.closeModal(ModalName.Layers);
    }
  }

  /**
   * Включение и отключение слоев
   * @param type Тип слоя
   * @param layer Слой
   */
  public switch(type: string, layer: string): void {
    if (!this.workingSchemeLayers[type][layer] || this.workingSchemeLayers[type][layer].value === false) {
      this.workingSchemeLayers[type][layer].iconPath = 'assets/images/icons/switch-on-initial.svg';
    } else {
      this.workingSchemeLayers[type][layer].iconPath  = 'assets/images/icons/switch-off.svg';
    }
    this.workingSchemeLayers[type][layer].value = !this.workingSchemeLayers[type][layer].value ;
  }

  /**
   * Скрывает и показывает инфрмацию
   */
  public toggleInfo(): void {
    this.buttonText = !this.workingSchemeLayers.masterPlanOnly ? 'Показать все' :  'Показать только Мастер-план' ;
    this.workingSchemeLayers.masterPlanOnly = !this.workingSchemeLayers.masterPlanOnly;
  }

  /**
   * Инициализация слоев
   */
  public initLayers(): void {
    this.workingSchemeLayers = {
      masterPlan : {
        isBilling: {value: false, iconPath: 'assets/images/icons/switch-off.svg'},
        isNegotiation: {value: false, iconPath: 'assets/images/icons/switch-off.svg'},
        isFree: {value: false, iconPath: 'assets/images/icons/switch-off.svg'}
      },
      hotMap: {
        isSent: {value: false, iconPath: 'assets/images/icons/switch-off.svg'},
        isReserve: {value: false, iconPath: 'assets/images/icons/switch-off.svg'}
      },
      additional: {
        isZoning: {value: false, iconPath: 'assets/images/icons/switch-off.svg'}
      },
      masterPlanOnly: false
    };
  }
}
