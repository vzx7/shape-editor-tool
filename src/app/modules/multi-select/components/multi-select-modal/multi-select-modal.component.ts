import { StorageService } from 'modules/shared/services/storage/storage.service';
import { Stand } from 'modules/shared/interfaces/schema/stand';
import { BaseModalComponent } from 'modules/shared/components/base-modal/base-modal.component';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ModalName } from 'modules/shared/enums/modal-name.enum';
import { MultiSelectService } from '../../services/multi-select.service';
import { EditorStateService } from 'modules/shared/services/editor-state/editor-state.service';
import { ObjectType } from 'modules/shared/enums/object-type.enum';
import { StandsService } from 'modules/shared/services/stands/stands.service';
import { CreatedObject } from 'modules/shared/interfaces/editor/created-object';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-multi-select-modal',
  templateUrl: './multi-select-modal.component.html',
  styleUrls: ['./multi-select-modal.component.scss']
})
export class MultiSelectModalComponent extends BaseModalComponent implements OnInit {
  /**
   * Стенды
   */
  public stands: Stand[];

  /**
   * Если было активировано редактирование.
   */
  public isEditActive: boolean;

  /**
   * Выбранный стенд
   */
  public choosenStand: Stand;

  /**
   * Эмитор возвращения к списку после редактирования.
   */
  @Output() public afterEdit: EventEmitter<boolean>;

  /**
   * @param ngxSmartModalService Сервис модала
   * @param storageService Сервис-хранилище
   * @param multiSelectService СЕрвис массовго выдедения объектов
   * @param editorStateService Сервис для работы с редактором.
   * @param standsService Сервис для работы со стендами.
   */
  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public storageService: StorageService,
    private readonly multiSelectService: MultiSelectService,
    private readonly editorStateService: EditorStateService,
    private readonly standsService: StandsService
  ) {
    super(ngxSmartModalService);
    this.afterEdit = new EventEmitter<boolean>();
    this.stands = [];
    this.multiSelectService.standsSelected.subscribe((stands: Stand[]) => {
      this.stands = stands;
      this.openModal(ModalName.MultiSelect);
    });
    this.editorStateService.createHandler.subscribe((createdObject: CreatedObject) => {
      if (createdObject.objectType === ObjectType.Stand) {
        this.updateStand(createdObject.id);
      }
    });
  }

  public ngOnInit(): void { }

  /**
   * Удаление стендов
   */
  public deleteStands(): void {
    this.multiSelectService.deleteStands(this.stands);
    this.closeModal(ModalName.MultiSelect);
  }

  /**
   * Удаление стенда
   * @param stand Stand.
   */
  public deleteOneStand(stand: Stand): void {
    this.standsService.doEditorDeactivateEmit();
    this.multiSelectService.deleteStands([stand]);
    this.stands = this.stands.filter((s) => s.id !== stand.id);
    if (this.stands.length > 0) {
      this.getBack();
    } else {
      this.closeModal(ModalName.MultiSelectInfo);
    }
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
  public getBack(): void {
    this.closeModal(ModalName.MultiSelectInfo);
    this.openModal(ModalName.MultiSelect);
    this.standsService.doEditorDeactivateEmit();
    if (this.stands.length > 0 && this.isEditActive) {
      this.isEditActive = false;
      this.afterEdit.emit(true);
      this.multiSelectService.reSelectStands(this.stands);
    }
  }

  /**
   * Открытие модала
   */
  public open(): void {
    this.stands = this.storageService.schema.stands;
    this.openModal(ModalName.MultiSelect);
  }

  /**
   * Закрытие модала
   */
  public close(): void {
    this.closeModal(ModalName.MultiSelect);
  }

  /**
   * Редактировать стенд.
   * @param id ID стенда.
   */
  public editStand(id: string): void {
    this.isEditActive = true;
    this.standsService.editStand(id);
  }

  /**
   * Сохранить изминение площади стенда.
   * @param uuid uuid объекта.
   */
  private updateStand(uuid: string): void {
    this.choosenStand = this.standsService.updateStand(this.choosenStand, uuid);
  }
}
