import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BaseModalComponent } from 'modules/shared/components/base-modal/base-modal.component';
import { StandsService } from 'modules/shared/services/stands/stands.service';
import { StorageService } from 'modules/shared/services/storage/storage.service';
import { ModalName } from 'modules/shared/enums/modal-name.enum';
import { EditorStateService } from 'modules/shared/services/editor-state/editor-state.service';
import { Stand } from 'modules/shared/interfaces/schema/stand';
import { CreatedObject } from 'modules/shared/interfaces/editor/created-object';
import { Options } from 'modules/objects/interfaces/options';
import { ModalState } from 'modules/shared/interfaces/modal/modal-state';
import { ObjectType } from 'modules/shared/enums/object-type.enum';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { EditorMode } from 'modules/shared/enums/editor-mode.enum';

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

  /**
   * Опции в футере КП
   */
  public options: Options;

  /**
   * Путь до иконки
   */
  public iconPath: string;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public storageService: StorageService,
    private readonly standsService: StandsService,
    private readonly editorStateService: EditorStateService
  ) {
    super(ngxSmartModalService);
    this.iconPath = 'assets/images/icons/switch-off.svg';
  }

  public ngOnInit(): void {
    this.editorStateService.createHandler.subscribe((createdObject: CreatedObject) => {
      if (createdObject.objectType === ObjectType.Stand) {
        this.updateStand(createdObject.id);
      }
    });
  }

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
   * Открытие модала
   */
  public open(): void {
    this.stands = this.storageService.schema.stands;
    this.openModal(ModalName.StandList);
  }

  /**
   * Закрытие модала
   */
  public close(): void {
    this.closeModal(ModalName.StandList);
  }

  /**
   * Отображение информации о выбранном стенде
   * @param stand выбранынй стенд
   */
  public showInfo(stand: any): void {
    this.isSecondModalOpen = true;
    this.choosenStand = stand;
    this.options = {
      netting: { value: false, iconPath: this.iconPath },
      vip: { value: false, iconPath: this.iconPath }
    };
    this.closeModal(ModalName.StandList);
    this.openModal(ModalName.StandInfoList);
  }

  /**
   * Включение и отключение опций
   * @param option Опция
   */
  public switch(option: string): void {
    if (!this.options[option] || this.options[option].value === false) {
      this.options[option].iconPath = 'assets/images/icons/switch-on-initial.svg';
    } else {
      this.options[option].iconPath = 'assets/images/icons/switch-off.svg';
    }
    this.options[option].value = !this.options[option].value;
  }

  /**
   * Закрыть модал информации стендов.
   */
  public onCloseStandInfoList(): void {
    this.isSecondModalOpen = false;
    this.openModal(ModalName.StandList);
    this.doEditorDeactivateEmit();
    this.isEditActive = false;
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
   * @param modalId Идентификатор модала.
   */
  public getBack(): void {
    this.openModal(ModalName.StandList);
    this.closeModal(ModalName.StandInfoList);
  }

  /**
   * Редактировать стенд.
   * @param id ID стенда.
   */
  public editStand(id: string): void {
    this.standsService.editStand(id);
  }

  /**
   * Сохранить изминение площади стенда.
   * @param uuid uuid объекта.
   */
  private updateStand(uuid: string): void {
    this.choosenStand = this.standsService.updateStand(this.choosenStand, uuid);
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
