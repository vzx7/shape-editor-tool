
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../toaster/toast.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(
    private readonly injector: Injector,
  ) { }

  /**
   * Обработка событий
   * @param error Ошибка
   */
  public handleError(error: Error | HttpErrorResponse): void {

    if (error instanceof HttpErrorResponse) {
      // Серверная ошибка
      if (!navigator.onLine) {
        return this.showError('Отсутствует интернет соединение', 'Отсутствует интернет соединение');
      }

      // Http Ошибка
      return this.showError(error, `${error.status} - ${error.message}`);
    } else {
      // Клиентская ошибка
      return this.showError(error, error.message);
    }
  }

  /**
   * Показ ошибок
   * @param toConsole Вывод ошибки в консоль
   * @param toUser Вывод ошибки пользователю
   */
  public showError(toConsole: any, toUser: string): void {
    const toastService = this.injector.get(ToastService);
    if (!environment.production) {
      console.error(toConsole);
    }
    toastService.showError(toUser);
  }
}
