import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandListComponent } from './stands/components/stand-list/stand-list.component';
import { CreateStandComponent } from './stands/components/create-stand/create-stand.component';
import { SharedModule } from 'modules/shared/shared.module';
import { StandsService } from '../../shared/services/stands/stands.service';
import { StandsComponent } from './stands/components/stands/stands.component';
import { InlineSVGModule } from 'ng-inline-svg';
import {
  PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

/**
 * Модуль для работы со стендами
 */
@NgModule({
  declarations: [
    CreateStandComponent,
    StandListComponent,
    StandsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InlineSVGModule,
    PerfectScrollbarModule
  ],
  exports: [
    StandsComponent
  ],
  providers: [
    StandsService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class StandsModule { }
