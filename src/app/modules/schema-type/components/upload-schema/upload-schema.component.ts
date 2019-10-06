import { Component, OnInit } from '@angular/core';
import { BaseModalComponent } from 'modules/shared/components/base-modal/base-modal.component';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ModalName } from 'modules/shared/enums/modal-name.enum';
import { StorageService } from 'modules/shared/services/storage/storage.service';
import { HallSchema } from 'modules/shared/interfaces/schema/hall-schema';
import { FileService } from 'modules/shared/modules/file/services/file.service';
import { routes } from 'core/configs/route-list.config';

@Component({
  selector: 'app-upload-schema',
  templateUrl: './upload-schema.component.html',
  styleUrls: ['./upload-schema.component.scss']
})
export class UploadSchemaComponent extends BaseModalComponent implements OnInit {

  /**
   * Ссылка
   */
  public url: string;

  /**
   * Конструктор
   * @param ngxSmartModalService Сервис модалов
   * @param fileService Сервис работы с файлами
   * @param storageService Сервис-хранилище
   */
  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private readonly fileService: FileService,
    public storageService: StorageService
  ) {
    super(ngxSmartModalService);
    this.url = `${routes.halls}/1`;
    this.fileService.schemaUploaded.subscribe((schema: HallSchema) => {
      this.closeModal(ModalName.AddSchema);
    });
   }

  public ngOnInit(): void {
  }

  /**
   * Открытие модала
   */
  public open(): void {
    this.openModal(ModalName.AddSchema);
  }

  /**
   * Закрытие модала
   */
  public close(): void {
    this.closeModal(ModalName.AddSchema);
  }
}
