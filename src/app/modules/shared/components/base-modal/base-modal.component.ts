import { EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormGroup } from '@angular/forms';
import { ModalState } from 'modules/shared/interfaces/modal/modal-state';
import { ModalName } from 'modules/shared/enums/modal-name.enum';

export class BaseModalComponent implements OnInit {
  /**
   * Событие закрытие модала.
   */
  @Output() public closeHandler: EventEmitter<ModalState>;

  /**
   * Перечесление Id модалов.
   */
  public modalName: typeof ModalName;

  /**
   * Форма.
   */
  public form: FormGroup;

  constructor(
    public ngxSmartModalService: NgxSmartModalService
  ) {
    this.modalName = ModalName;
    this.closeHandler = new EventEmitter<ModalState>();
  }

  public ngOnInit(): void {
  }

  /**
   * Открытие модала
   * @param modalId Идентификатор модала
   */
  public openModal(modalId: string): void {
    this.ngxSmartModalService.getModal(modalId).open();
  }

  /**
   * Закрытие модала
   * @param modalId Идентификатор модала
   */
  public closeModal(modalId: string): void {
    this.ngxSmartModalService.getModal(modalId).close();
  }

  /**
   * Оповещение об собыйтии модала.
   * @param modalId ID модала
   * @param isOpen Открытие или закрытие модала.
   */
  public actionEmit(modalId: ModalName, isOpen: boolean): void {
    this.closeHandler.emit({
      modalId,
      isOpen
    });
  }
}
