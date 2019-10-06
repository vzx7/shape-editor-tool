import { Component, OnInit } from '@angular/core';

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

  constructor() {
    this.iconPath = 'assets/images/icons/switch-off.svg';
  }

  public ngOnInit(): void { }

  /**
   * Переключение схемы.
   */
  public switchSchema(): void {
    if (!this.isWorkSchemaActive) {
      this.iconPath = 'assets/images/icons/switch-on.svg';
    } else {
      this.iconPath = 'assets/images/icons/switch-off.svg';
    }
    this.isWorkSchemaActive = !this.isWorkSchemaActive;
  }

  /**
   * Активация импорта в рабочую схему.
   */
  public importToWorkSchema(): void {
    this.isImportActive = !this.isImportActive;
  }

  /**
   * Активация импорта из рабочей схемы.
   */
  public exportFromWorkSchema(): void {
    this.isExportActive = !this.isExportActive;
  }
}
