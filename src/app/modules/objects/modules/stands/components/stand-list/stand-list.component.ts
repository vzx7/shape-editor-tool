import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BaseModalComponent } from 'modules/shared/components/base-modal/base-modal.component';
import { StandsService } from 'modules/shared/services/stands/stands.service';
import { StorageService } from 'modules/shared/services/storage/storage.service';
import { ModalName } from 'modules/shared/enums/modal-name.enum';
import { EditorStateService } from 'modules/shared/services/editor-state/editor-state.service';
import { Stand } from 'modules/shared/interfaces/schema/stand';
import { ModalState } from 'modules/shared/interfaces/modal/modal-state';

/**
 * Компонент для модалов списка стендов и списка информации стендов.
 */
@Component({
  selector: 'app-stand-list',
  templateUrl: './stand-list.component.html',
  styleUrls: ['./stand-list.component.scss']
})
export class StandListComponent extends BaseModalComponent implements OnInit {
  /**
   * Стенды
   */
  public stands: Stand[];

  /**
   * Выбранный стенд
   */
  public choosenStand: Stand;

  /**
   * Если открыт ли второй модал.
   */
  public isSecondModalOpen: boolean;

  /**
   * Если включено редактирование.
   */
  public isEditActive: boolean;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private readonly storageService: StorageService,
    private readonly standsService: StandsService,
    private readonly editorStateService: EditorStateService
  ) {
    super(ngxSmartModalService);
    this.standsService.isActivated.subscribe((isActive: boolean) => {
      if (isActive) {
        this.stands = this.storageService.stands;
        this.openModal(ModalName.StandList);
      }
    });
  }

  public ngOnInit(): void {  }

  // tslint:disable-next-line:use-life-cycle-interface
  public ngOnDestroy(): void {
    this.editorStateService.createHandler.unsubscribe();
  }

  /**
   * Добавление стенда
   */
  public addStand(): void {
    this.isSecondModalOpen = true;
    this.choosenStand = null;
    this.closeModal(ModalName.StandList);
    this.openModal(ModalName.CreateStand);
  }

  /**
   * Отображение информации о выбранном стенде
   * @param stand выбранынй стенд
   */
  public showInfo(stand: any): void {
    this.isSecondModalOpen = true;
    this.choosenStand = stand;
    this.closeModal(ModalName.StandList);
    this.openModal(ModalName.StandInfo);
  }

  /**
   * Закрыть модал списка стендов.
   */
  public onCloseStandList(): void {
    if (!this.isSecondModalOpen) {
      super.actionEmit(ModalName.StandList, false);
      this.doEditorDeactivateEmit();
    }
  }

  /**
   * Метод на закрытие модала информации.
   * @param modalState Состояние модала.
   */
  public getBack(modalState: ModalState): void {
    if (modalState.modalId === ModalName.StandInfo || modalState.modalId === ModalName.CreateStand) {
      this.isSecondModalOpen = modalState.isOpen;
      this.openModal(ModalName.StandList);
    }
  }

  /**
   * Вызываем событие деактивации редактора.
   */
  private doEditorDeactivateEmit(): void {
    this.editorStateService.modeHandler.emit({
      isEditMode: false
    });
  }
}
