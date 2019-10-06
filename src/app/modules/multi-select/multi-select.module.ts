import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectPanelComponent } from './components/multi-select-panel/multi-select-panel.component';
import { MultiSelectModalComponent } from './components/multi-select-modal/multi-select-modal.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { MultiSelectService } from './services/multi-select.service';
import { SharedModule } from 'modules/shared/shared.module';
import {
  PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

/**
 * Модуль иснтрумента "Множественный выбор"
 */
@NgModule({
  declarations: [
    MultiSelectPanelComponent,
    MultiSelectModalComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    SharedModule,
    PerfectScrollbarModule
  ],
  exports: [
    MultiSelectPanelComponent
  ],
  providers: [
    MultiSelectService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class MultiSelectModule { }
