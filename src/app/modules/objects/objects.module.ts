import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectsPanelComponent } from './components/objects-panel/objects-panel.component';
import { LayersComponent } from './components/layers/layers.component';
import { ZonesComponent } from './components/zones/zones.component';
import { StandsModule } from './modules/stands.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { LayersModalComponent } from './components/layers/layers-modal/layers-modal.component';
import { SharedModule } from 'modules/shared/shared.module';

/**
 * Модуль для работы с инструментами блока "Объекты"
 */
@NgModule({
  declarations: [
    ObjectsPanelComponent,
    LayersComponent,
    ZonesComponent,
    LayersModalComponent
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
