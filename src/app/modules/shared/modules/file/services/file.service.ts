import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { RequestService } from 'modules/shared/services/request/request.service';
import { HallSchema } from 'modules/shared/interfaces/schema/hall-schema';

/**
 * Сервис для работы с файлами
 */
@Injectable()
export class FileService {

  public schemaUploaded: EventEmitter<HallSchema>;
  constructor(
    private readonly requestService: RequestService
  ) {
    this.schemaUploaded = new EventEmitter<HallSchema>();
  }

  /**
   * Загрузка файла
   * @param file файл
   * @param api путь
   * @param complete Функция, которая вызывается в любом случае
   * @return идентификатор
   */
  public upload(file: File, api: string, complete?: Function): Observable<HallSchema> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.requestService.post(api, complete, formData, headers);
  }
}
