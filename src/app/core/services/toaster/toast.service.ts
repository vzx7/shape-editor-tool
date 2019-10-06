import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';

/**
 * Сервис для показа нотификаций
 */
@Injectable()
export class ToastService {

  /**
   * Идентификатор тостера загрузки
   */
  private loadingId: number;

  /**
   * Пустой ли вызов
   */
  private isEmpty: boolean;

  /**
   * Конструктор
   * @param toastr Сервис библиотеки тостеров
   */
  constructor(
    private readonly toastr: ToastrService
  ) {
  }

  /**
   * Вывод собщений об ошибках.
   * @param message Сообщение для вывода.
   * @param sticky Закрывать сообщение по требованию.
   * @param enableHtml Использовать ли html
   */
  public showError(message: string, sticky: boolean = false, enableHtml: boolean = false): void {
    this.toastr.error(message, null, this.getOptions(sticky, enableHtml));
  }

  /**
   * Вывод успешных собщений.
   * @param message Сообщение для вывода.
   * @param sticky Закрывать сообщение по требованию.
   * @param enableHtml Использовать ли html
   */
  public showSuccess(message: string, sticky: boolean = false, enableHtml: boolean = false): void {
    this.toastr.success(message, null, this.getOptions(sticky, enableHtml));
  }

  /**
   * Вывод успешных собщений.
   * @param message Сообщение для вывода.
   * @param sticky Закрывать сообщение по требованию.
   * @param enableHtml Использовать ли html
   */
  public showWarning(message: string, sticky: boolean = false, enableHtml: boolean = false): void {
    this.toastr.warning(message, null, this.getOptions(sticky, enableHtml));
  }

  /**
   * Показ загрузки
   */
  public showLoading(): void {
    const message = 'Загрузка...';
    if (environment.production) {
      this.showLoadingInternal(message);
    } else {
      setTimeout(() => {
        this.showLoadingInternal(message);
      });
    }
  }

  /**
   * Скрытие загрузки
   */
  public hideLoading(): void {
    if (environment.production) {
      this.hideLoadingInternal();
    } else {
      setTimeout(() => {
        this.hideLoadingInternal();
      });
    }
  }

  /**
   * Внутреннеее скрытие загрузки
   */
  public hideLoadingInternal(): void {
    this.isEmpty = this.loadingId === undefined;
    this.toastr.remove(this.loadingId);
  }

  /**
   * Показ собщения загрузки
   * @param message Сообщение
   */
  private showLoadingInternal(message: string): void {
    const loadingToasts = this.toastr.toasts.filter((el) => el.message === message);
    if (loadingToasts.length > 0) {
      return;
    }
    const toast = this.toastr.show(message, null, this.getOptions(true, true, false));
    this.loadingId = toast.toastId;
    if (this.isEmpty) {
      this.hideLoading();
    }
  }

  /**
   * Настройки тостера
   * @param sticky Закрывать сообщение по требованию.
   * @param enableHtml Использовать ли html
   * @param closeButton Копка закрытия
   * @return Настройки
   */
  private getOptions(sticky: boolean, enableHtml: boolean, closeButton: boolean = true): Partial<IndividualConfig> {
    return {
      onActivateTick: true,
      closeButton: closeButton,
      tapToDismiss: false,
      disableTimeOut: sticky,
      enableHtml: enableHtml
    };
  }

}
