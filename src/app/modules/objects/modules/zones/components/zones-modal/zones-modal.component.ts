import { Component, OnInit } from '@angular/core';
import { BaseModalComponent } from 'modules/shared/components/base-modal/base-modal.component';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ModalName } from 'modules/shared/enums/modal-name.enum';
import { Zone } from 'modules/shared/interfaces/schema/zone';
import { Colors } from 'modules/shared/enums/colors.enum';
@Component({
  selector: 'app-zones-modal',
  templateUrl: './zones-modal.component.html',
  styleUrls: ['./zones-modal.component.scss']
})
export class ZonesModalComponent extends BaseModalComponent implements OnInit {

  /**
   * Путь к изображения для тогглера
   */
  public iconPath: string;

  /**
   * Показать зонирование на схеме-участника
   */
  public showZoning: boolean;

  /**
   * Зоны
   */
  public zones: Zone[];

  /**
   * Выбранная зона
   */
  public chosenZone: Zone;

  constructor(
    public ngxSmartModalService: NgxSmartModalService
    ) {
      super(ngxSmartModalService);
      this.iconPath = 'assets/images/icons/switch-off.svg';
      this.initZones();
  }

  public ngOnInit(): void {

  }

  /**
   * Включение и отключение слоев
   * @param layer Слой
   */
  public switch(): void {
    if (this.showZoning) {
      this.iconPath = 'assets/images/icons/switch-on-initial.svg';
    } else {
      this.iconPath = 'assets/images/icons/switch-off.svg';
    }
    this.showZoning = !this.showZoning;
}

  /**
   * Открытие модала
   */
  public open(): void {
    this.openModal(ModalName.Zones);
  }

  /**
   * Закрытие модала
   */
  public close(): void {
    this.closeModal(ModalName.Zones);
  }

  /**
   * Отображение информации о выбранном стенде
   * @param zone выбранынная зона
   */
  public showInfo(zone: Zone): void {
    this.chosenZone = zone;
    this.closeModal(ModalName.Zones);
    this.openModal(ModalName.ZonesInfo);
  }

  /**
   * Метод на закрытие модала информации.
   */
  public getBack(): void {
    this.closeModal(ModalName.ZonesInfo);
    this.openModal(ModalName.Zones);
  }

  /**
   * Изменение(выбор) цвета
   * @param e Событие
   */
  public onChange(e: Event): void {
    this.chosenZone.fill = (<HTMLInputElement>e.currentTarget).value;
  }

  /**
   * Инициализация Зон
   */
  public initZones(): void {
    this.zones = [
      {
        id: '56765t',
        geometry: { bound: []},
        name: 'Национальная экспозиция Италии',
        fill: Colors.Navy
      }
    ];
  }
}
