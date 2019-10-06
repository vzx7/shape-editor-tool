import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZonesModalComponent } from './components/zones-modal/zones-modal.component';
import { ZonesComponent } from './components/zones/zones.component';
import { ZonesService } from './services/zones/zones.service';
import { InlineSVGModule } from 'ng-inline-svg';
import { SharedModule } from 'modules/shared/shared.module';

@NgModule({
  declarations: [ZonesModalComponent, ZonesComponent],
  imports: [
    CommonModule,
    SharedModule,
    InlineSVGModule
  ],
  providers: [
    ZonesService
  ],
  exports: [
    ZonesModalComponent, ZonesComponent
  ]
})
export class ZonesModule { }
