import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemaTypePanelComponent } from './components/schema-type-panel/schema-type-panel.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { SharedModule } from 'modules/shared/shared.module';
import { UploadSchemaComponent } from './components/upload-schema/upload-schema.component';
import { FileModule } from 'modules/shared/modules/file/file.module';

/**
 * Модуль для работы с инструментам "Тип схемы"
 */
@NgModule({
  declarations: [SchemaTypePanelComponent, UploadSchemaComponent],
  imports: [
    CommonModule,
    SharedModule,
    FileModule,
    InlineSVGModule
  ],
  exports: [SchemaTypePanelComponent, UploadSchemaComponent]
})
export class SchemaTypeModule { }
