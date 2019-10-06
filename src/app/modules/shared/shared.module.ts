import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormService } from 'modules/shared/services/form/form.service';
import { ObjectsHostService } from './services/objects-host/objects-host.service';
import { StorageService } from './services/storage/storage.service';
import { UtilitesService } from './services/utilites/utilites.service';
import { TransformationHelperService } from './services/transformation-helper/transformation-helper.service';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { RequestService } from './services/request/request.service';
import { EditorStateService } from './services/editor-state/editor-state.service';
import { WorkAreaService } from './services/work-area/work-area.service';
import { ToolActivateService } from './services/tool-activate/tool-activate.service';
import { SelectAreaService } from './services/select-area/select-area.service';
import { StandInfoModalComponent } from './components/stand-info-modal/stand-info-modal.component';
import { StandsService } from './services/stands/stands.service';

/**
 * @todo описать модуль.
 */
@NgModule({
  declarations: [StandInfoModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [
    ObjectsHostService,
    StorageService,
    FormService,
    RequestService,
    UtilitesService,
    TransformationHelperService,
    EditorStateService,
    WorkAreaService,
    ToolActivateService,
    SelectAreaService,
    StandsService
  ],
  exports: [
    NgxSmartModalModule,
    ReactiveFormsModule,
    StandInfoModalComponent
  ]
})
export class SharedModule { }
