import { EventEmitter, Injectable } from '@angular/core';
import { Hall } from 'modules/shared/interfaces/schema/hall';
import { Observable } from 'rxjs';
import { RequestService } from 'modules/shared/services/request/request.service';
import { routes } from 'core/configs/route-list.config';
import { StorageService } from 'modules/shared/services/storage/storage.service';

@Injectable()
export class PavilionService {

  /**
   * Открыт ли выбо павильона
   */
  public selectOpened: EventEmitter<boolean>;

  constructor(
    private readonly storageService: StorageService,
    private readonly requestService: RequestService
  ) {
    this.selectOpened = new EventEmitter<boolean>();
  }

  /**
   * Выбор павилиона.
   * @param hall Павилион.
   */
  public selectHall(hall: Hall): void {
    this.storageService.pavilionChosen.emit(hall);
  }

  /**
   * Получить все павилионы.
   * @return Observable<Hall[]>
   */
  public getHalls(): Observable<Hall[]> {
    return this.requestService.get(routes.halls);
  }
}
