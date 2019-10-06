import { ZoomService } from './services/zoom/zoom.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoomPanelComponent } from './components/zoom-panel/zoom-panel.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { SharedModule } from 'modules/shared/shared.module';
import { ZoomComponent } from './components/zoom/zoom.component';

/**
 * Модуль для работы с зумированием объектов схемы.
 */
@NgModule({
  declarations: [
    ZoomPanelComponent,
    ZoomComponent
  ],
  providers: [
    ZoomService
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    SharedModule
  ],
  exports: [
    ZoomPanelComponent
  ]
})
export class ZoomModule { }
