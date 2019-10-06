import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemaTypePanelComponent } from './components/schema-type-panel/schema-type-panel.component';
import { InlineSVGModule } from 'ng-inline-svg';

/**
 * Модуль для работы с инструментам "Тип схемы"
 */
@NgModule({
  declarations: [SchemaTypePanelComponent],
  imports: [
    CommonModule,
    InlineSVGModule
  ],
  exports: [SchemaTypePanelComponent]
})
export class SchemaTypeModule { }
