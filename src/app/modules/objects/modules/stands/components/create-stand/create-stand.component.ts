import { Component, OnInit, ViewChild } from '@angular/core';
import { StandsService } from 'modules/shared/services/stands/stands.service';
import { BaseModalComponent } from 'modules/shared/components/base-modal/base-modal.component';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormService } from 'modules/shared/services/form/form.service';
import { EditorStateService } from 'modules/shared/services/editor-state/editor-state.service';
import { ObjectType } from 'modules/shared/enums/object-type.enum';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { EditorMode } from 'modules/shared/enums/editor-mode.enum';
import { CreatedObject } from 'modules/shared/interfaces/editor/created-object';
import { ModalName } from 'modules/shared/enums/modal-name.enum';
import { StorageService } from 'modules/shared/services/storage/storage.service';
import { Stand } from 'modules/shared/interfaces/schema/stand';
import { ObjectStatus } from 'modules/shared/enums/object-status.enum';
import { ToastService } from 'core/services/toaster/toast.service';
import { ThrowStmt } from '@angular/compiler';

/**
 * Компонент модала создания стенда.
 */
@Component({
  selector: 'app-create-stand',
  templateUrl: './create-stand.component.html',
  styleUrls: ['./create-stand.component.scss']
})
export class CreateStandComponent extends BaseModalComponent implements OnInit {

  @ViewChild('modal') public modal: any;

  /**
   * Форма (для сброса submitted)
   */
  @ViewChild('ngForm') public ngForm: NgForm;

  /**
   * Если геометрия добавлена.
   */
  public isAddGeometryStart: boolean;

  /**
   * Перечесление Id модалов.
   */
  public modalName: typeof ModalName;

  /**
   * id нового стенда.
   */
  public standId: string;

  /**
   * Площадь стенда стенда.
   */
  public standSquare: string;

  /**
   * Ошибки для показа
   */
  public errors: string[];

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private readonly standsService: StandsService,
    public readonly formService: FormService,
    private readonly fb: FormBuilder,
    private readonly toastService: ToastService,
    private readonly editorStateService: EditorStateService,
    private readonly storageService: StorageService
  ) {
    super(ngxSmartModalService);
    this.modalName = ModalName;
    this.editorStateService.createHandler.subscribe((createdObject: CreatedObject) => {
      if (createdObject.objectType === ObjectType.Stand && this.isAddGeometryStart) {
        this.standId = createdObject.id;
        this.calculateStandSquare();
      }
    });
    this.errors = [];
  }

  public ngOnInit(): void {
    this.initForm();

  }

  // tslint:disable-next-line:use-life-cycle-interface
  public ngOnDestroy(): void {
    this.editorStateService.createHandler.unsubscribe();
  }

  /**
   * Добавить геомтерию стенда.
   * @param event объект клика по кнопке.
   */
  public addStandGeometry(event: any): void {
    event.preventDefault();
    this.isAddGeometryStart = true;
    this.editorStateService.modeHandler.emit({
      isEditMode: true,
      objectType: ObjectType.Stand,
      toolName: ToolNames.PolygonTool,
      editorMode: EditorMode.Create,
    });
  }

  /**
   * Сохранение нового полигона.
   * @return флаг
   */
  public onSave(): boolean  {
    if (this.standId && this.formService.validateForm(this.form)) {
      this.editorStateService.modeHandler.emit({
        isEditMode: false
      });
      this.isAddGeometryStart = false;
      const stand = <Stand>this.storageService.getObject(ObjectType.Stand, this.standId);
      stand.square = Number(this.standSquare);
      stand.status = ObjectStatus.StandFree;
      stand.number = this.form.get('number').value;
      this.standId = null;
      super.closeModal(ModalName.CreateStand);
      this.resetForm(this.form, this.ngForm);

      return true;
      } else {
        this.showErrors();

        return false;
      }
  }

  /**
   * Обработчик события закрытия модала.
   */
  public onClose(): void {
    this.isAddGeometryStart = false;
    super.actionEmit(ModalName.CreateStand, false);
  }

  /**
   * Показ ошибок, если форма невалидна
   */
  public showErrors(): void {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      let message = '';

      if (control.invalid) {
        if (key === 'number') {
          message = 'Пожалуйста введите номер стенда';
          this.errors.push(message);
        }
        this.errors.forEach((msg) => {
          this.toastService.showError(msg);
        });
      }
    });
  }

  /**
   * Инициализация формы
   */
  private rebuildForm(): void {
    this.form.get('square').setValue(this.standSquare);
  }

  /**
   * Расчет площадь
   */
  private calculateStandSquare(): void {
    const fractionLength = 2;
    this.standSquare = this.standsService.getSquareStand(this.standId).toFixed(fractionLength);
    this.rebuildForm();
  }

  /**
   * Сброс формы
   * @param form  форма
   * @param ngForm форма показа
   */
  private resetForm(form: FormGroup, ngForm: NgForm): void {
    if (ngForm) {
      ngForm.resetForm(); // для сброса флага submit
    }

    form.reset(); // Обновление показа ошибок
  }

  /**
   * Инициализация формы
   */
  private initForm(): void {
    this.form = this.fb.group({
      number: new FormControl([], [Validators.required, Validators.maxLength(this.formService.maxLengthForm),
      Validators.pattern(this.formService.nonWhiteSpaceRegexp)]),
      square: new FormControl({value: '', disabled: true})
    });
  }
}
