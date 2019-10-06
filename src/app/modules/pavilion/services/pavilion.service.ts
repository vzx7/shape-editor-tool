import { EventEmitter, Injectable } from '@angular/core';
import { Hall } from 'modules/shared/interfaces/schema/hall';
import { StorageService } from 'modules/shared/services/storage/storage.service';

@Injectable()
export class PavilionService {

  /**
   * Открыт ли выбо павильона
   */
  public selectOpened: EventEmitter<boolean>;

  constructor(
    private readonly storageService: StorageService
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
}
