import { Component, OnInit } from '@angular/core';
import { MultiSelectService } from '../../services/multi-select.service';
import { BaseModalComponent } from 'modules/shared/components/base-modal/base-modal.component';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ModalName } from 'modules/shared/enums/modal-name.enum';
import { Stand } from 'modules/shared/interfaces/schema/stand';
import { ModalState } from 'modules/shared/interfaces/modal/modal-state';

@Component({
  selector: 'app-multi-select-modal',
  templateUrl: './multi-select-modal.component.html',
  styleUrls: ['./multi-select-modal.component.scss']
})
export class MultiSelectModalComponent extends BaseModalComponent  implements OnInit {
  /**
   * Стенды
   */
  public stands: Stand[];

  /**
   * Текст при удалении
   */
  public deleteText: any;

  /**
   * Выбранный стенд
   */
  public choosenStand: any;

  /**
   * @param ngxSmartModalService Сервис модала
   * @param multiSelectService СЕрвис массовго выдедения объектов
   */
  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private readonly multiSelectService: MultiSelectService
  ) {
    super(ngxSmartModalService);
    this.stands = [];
    this.choosenStand = {data: ''};
    this.multiSelectService.standsSelected.subscribe((stands: Stand[]) => {
      this.stands = stands;
      this.ngxSmartModalService.getModal(ModalName.MultiSelect).open();
    });
    this.multiSelectService.standsDeleted.subscribe(() => {
      this.ngxSmartModalService.getModal(ModalName.MultiSelect).close();
    });
   }

  public ngOnInit(): void {  }

  /**
   * Удаление стендов
   */
  public deleteStands(): void {
    this.multiSelectService.deleteStands(this.stands);
  }

  /**
   * Отображение информации о выбранном стенде
   * @param stand выбранынй стенд
   */
  public showInfo(stand: any): void {
    this.choosenStand = stand;
    this.closeModal(ModalName.MultiSelect);
    this.openModal(ModalName.MultiSelectInfo);
  }

  /**
   * Метод на закрытие модала информации.
   * @param modalState Состояние модала.
   */
  public getBack(modalState: ModalState): void {
    if (modalState.modalId === ModalName.MultiSelectInfo) {
      this.openModal(ModalName.MultiSelect);
    }
  }
}
