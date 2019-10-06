import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayersComponent } from './components/layers/layers.component';
import { LayersModalComponent } from './components/layers-modal/layers-modal.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { SharedModule } from 'modules/shared/shared.module';
import { LayersService } from './services/layers/layers.service';

@NgModule({
  declarations: [
    LayersComponent,
    LayersModalComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    SharedModule
  ],
  exports: [
    LayersComponent
  ],
  providers: [
    LayersService
  ]
})
export class LayersModule { }
