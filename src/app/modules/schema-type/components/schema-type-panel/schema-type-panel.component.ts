import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from 'modules/shared/services/storage/storage.service';
import { UploadSchemaComponent } from '../upload-schema/upload-schema.component';

/**
 * Компонент инструмента "Тип схемы"
 */
@Component({
  selector: 'app-schema-type-panel',
  templateUrl: './schema-type-panel.component.html',
  styleUrls: ['./schema-type-panel.component.scss']
})
export class SchemaTypePanelComponent implements OnInit {

  /**
   * Модал.
   */
  @ViewChild('modal') public modal: UploadSchemaComponent;

  /**
   * Если активен инструмент импорта
   */
  public isImportActive: boolean;

  /**
   * Если активен инструмент экспорта
   */
  public isExportActive: boolean;

  /**
   * Если выбрана рабчая схема.
   */
  public isWorkSchemaActive: boolean;

  /**
   * Путь до иконки
   */
  public iconPath: string;

  constructor(
    public storageService: StorageService
  ) {
    this.iconPath = 'assets/images/icons/switch-off.svg';
  }

  public ngOnInit(): void { }

  /**
   * Переключение схемы.
   */
  public switchSchema(): void {
    if (this.storageService.isWorkingScheme) {
      this.iconPath = 'assets/images/icons/switch-on.svg';
    } else {
      this.iconPath = 'assets/images/icons/switch-off.svg';
    }
    this.storageService.isWorkingScheme = !this.storageService.isWorkingScheme;
  }

  /**
   * Активация импорта в рабочую схему.
   */
  public importToWorkSchema(): void {
    this.isImportActive = !this.isImportActive;
    this.modal.open();
  }

  /**
   * Активация импорта из рабочей схемы.
   */
  public exportFromWorkSchema(): void {
    this.isExportActive = !this.isExportActive;
  }
}
