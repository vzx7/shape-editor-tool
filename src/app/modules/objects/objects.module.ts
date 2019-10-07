import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectsPanelComponent } from './components/objects-panel/objects-panel.component';
import { StandsModule } from './modules/stands.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { SharedModule } from 'modules/shared/shared.module';

/**
 * Модуль для работы с инструментами блока "Объекты"
 */
@NgModule({
  declarations: [
    ObjectsPanelComponent
  ],
  imports: [
    CommonModule,
    StandsModule,
    SharedModule,
    InlineSVGModule
  ],
  exports: [
    ObjectsPanelComponent
  ]
})
export class ObjectsModule { }
