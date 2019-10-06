import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PavilionPanelComponent } from './components/pavilion-panel/pavilion-panel.component';
import { AutoCadLayerComponent } from './components/auto-cad-layer/auto-cad-layer.component';
import { ExportShemaComponent } from './components/export-shema/export-shema.component';
import { PavilionsComponent } from './components/pavilions/pavilions.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { AutoCadLayerModalComponent } from './components/auto-cad-layer-modal/auto-cad-layer-modal.component';
import { PavilionsModalComponent } from './components/pavilions-modal/pavilions-modal.component';
import { SharedModule } from 'modules/shared/shared.module';
import { PavilionService } from './services/pavilion.service';

/**
 * Модуль для взаимодействия с объектами блока “Павильон/Зал”
 */
@NgModule({
  declarations: [
    PavilionPanelComponent,
    AutoCadLayerComponent,
    ExportShemaComponent,
    PavilionsComponent,
    AutoCadLayerModalComponent,
    PavilionsModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InlineSVGModule
  ],
  exports: [
    PavilionPanelComponent
  ],
  providers: [
    PavilionService
  ]
})
export class PavilionModule { }
