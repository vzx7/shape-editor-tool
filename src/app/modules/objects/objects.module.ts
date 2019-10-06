import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectsPanelComponent } from './components/objects-panel/objects-panel.component';

import { StandsModule } from './modules/stands/stands.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { SharedModule } from 'modules/shared/shared.module';
import { LayersModule } from './modules/layers/layers.module';
import { AutocadLayersService } from './services/autocad-layers/autocad-layers.service';
import { LayersService } from './modules/layers/services/layers/layers.service';
import { ZonesModule } from './modules/zones/zones.module';

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
    ZonesModule,
    LayersModule,
    SharedModule,
    InlineSVGModule
  ],
  exports: [
    ObjectsPanelComponent
  ],
  providers: [
    AutocadLayersService,
    LayersService
  ]
})
export class ObjectsModule { }
