import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileService } from '../../services/file.service';
import { StorageService } from 'modules/shared/services/storage/storage.service';
import { HallSchema } from 'modules/shared/interfaces/schema/hall-schema';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent  implements OnInit {
  /**
   * Инпут для файла
   */
  @ViewChild('input') public input: ElementRef;

  /**
   * Отображение пути к файлу
   */
  @ViewChild('file') public filePath: ElementRef;

  /**
   * Ссылка
   */
  @Input() public url: string;

  /**
   * Файл загрузки
   */
  public file: File;

  /**
   * Конструктор
   * @param fileService Сервис для работы с файлами
   * @param storageService Сервис-хранилище
   */
  constructor(
    private readonly fileService: FileService,
    private readonly storageService: StorageService
  ) { }

  public ngOnInit(): void {
  }

  /**
   * Загрузка файла на сервер
   */
  public uploadFile(): void {
    this.fileService.upload( this.file, this.url, () => { })
    .subscribe((response: HallSchema) => {
      this.storageService.schema =  response;
      this.fileService.schemaUploaded.emit(response);
      this.filePath.nativeElement.textContent = '';
    });
  }

  /**
   * Смена пути к загружаемому файлу
   */
  public inputChange(): void {
    this.file = this.input.nativeElement.files[0];
  }
}
