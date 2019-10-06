import { EditorStateService } from 'modules/shared/services/editor-state/editor-state.service';
import { Component, Input, OnInit } from '@angular/core';
import { BaseModalComponent } from 'modules/shared/components/base-modal/base-modal.component';
import { StandsService } from 'modules/shared/services/stands/stands.service';
import { StorageService } from 'modules/shared/services/storage/storage.service';
import { ModalName } from 'modules/shared/enums/modal-name.enum';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ObjectType } from 'modules/shared/enums/object-type.enum';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { EditorMode } from 'modules/shared/enums/editor-mode.enum';
import { Stand } from 'modules/shared/interfaces/schema/stand';
import { CreatedObject } from 'modules/shared/interfaces/editor/created-object';

/**
 * Компонент информации о стенде.
 */
@Component({
  selector: 'app-stand-info-modal',
  templateUrl: './stand-info-modal.component.html',
  styleUrls: ['./stand-info-modal.component.scss']
})
export class StandInfoModalComponent extends BaseModalComponent implements OnInit {
  /**
   * Выбранный стенд
   */
  @Input() public choosenStand: Stand;

  /**
   * Идентификатор модала.
   */
  @Input() public modalId: ModalName;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private readonly storageService: StorageService,
    private readonly standsService: StandsService,
    private readonly editorStateService: EditorStateService
  ) {
    super(ngxSmartModalService);
    this.editorStateService.createHandler.subscribe((createdObject: CreatedObject) => {
      if (createdObject.objectType === ObjectType.Stand) {
        this.updateStand(createdObject.id);
      }
    });
  }

  public ngOnInit(): void {  }

  // tslint:disable-next-line:use-life-cycle-interface
  public ngOnDestroy(): void {
    this.editorStateService.createHandler.unsubscribe();
  }

  /**
   * Отображение информации о выбранном стенде
   * @param stand выбранынй стенд
   */
  public showInfo(): void {
    this.openModal(this.modalId);
  }

  /**
   * Возвращение к списку стендов
   */
  public getBack(): void {
    this.closeModal(this.modalId);
    this.onCloseStandInfo();
  }

  /**
   * Закрыть модал информации стендов.
   */
  public onCloseStandInfo(): void {
    this.doEditorDeactivateEmit();
  }

  /**
   * Редактировать стенд.
   * @param id ID стенда.
   */
  public editStand(id: string): void {
    this.editorStateService.modeHandler.emit({
      isEditMode: true,
      objectType: ObjectType.Stand,
      toolName: ToolNames.PolygonTool,
      editorMode: EditorMode.Update,
      objectId: id
    });
  }

  /**
   * Сохранить изминение площади стенда.
   * @param id ID объекта.
   */
  private updateStand(id: string): void {
    if (this.choosenStand) {
      this.choosenStand = this.storageService.getObject(ObjectType.Stand, this.choosenStand.id);
      this.choosenStand.square = Number(this.standsService.getSquareStand(id).toFixed());
    }
  }

  /**
   * Вызываем событие деактивации редактора.
   */
  private doEditorDeactivateEmit(): void {
    this.editorStateService.modeHandler.emit({
      isEditMode: false
    });
    this.actionEmit(this.modalId, false);
  }
}
