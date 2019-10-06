import { Injectable } from '@angular/core';
import { StorageService } from 'modules/shared/services/storage/storage.service';
import { Stand } from 'modules/shared/interfaces/schema/stand';
/**
 * Сервис для поиска.
 */
@Injectable()
export class SearchService {
  /**
   * Все стенды хола.
   */
  private stands: Stand[];

  constructor(
    private readonly storageService: StorageService
  ) {
    this.storageService.schemaLoaded.subscribe(() => {
      this.stands = Object.assign([], this.storageService.schema.stands);
    });
  }

  /**
   * Поиск стендов
   * @param searchString поисковая строка
   */
  public filterStands(searchString: string): void {
    if (searchString !== '') {
      this.storageService.schema.stands = this.stands.filter((stand: Stand) => {
        if (stand.name || stand.number || stand.company) {
          return stand.name.includes(searchString) || stand.number.includes(searchString)
            || stand.company.includes(searchString);
        }
      });
    }
  }

  /**
   * Очистка поиска
   */
  public clearSearch(): void {
    this.storageService.schema.stands = this.stands;
  }
}
