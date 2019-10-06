import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HallSchema } from 'modules/shared/interfaces/schema/hall-schema';
import { RequestService } from 'modules/shared/services/request/request.service';
import { routes } from 'core/configs/route-list.config';

@Injectable()
export class MainService {

  constructor(
    private readonly requestService: RequestService
  ) { }

  /**
   * Получить схему павильона.
   * @param hallId Идентификатор павильона.
   * @return Observable<HallSchema> схема павильона.
   */
  public getHall(hallId: string): Observable<HallSchema> {
    return this.requestService.get(`${routes.halls}/${hallId}`);
  }
}
