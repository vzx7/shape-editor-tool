import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';

import { MovementService } from './services/movement/movement.service';
import { EditorPanelComponent } from './components/editor-panel/editor-panel.component';
import { PolygonComponent } from './components/polygon/polygon.component';
import { TextComponent } from './components/text/text.component';
import { MovementComponent } from './components/movement/movement.component';
import { RotatorComponent } from './components/rotator/rotator.component';
import { PainterService } from './services/painter/painter.service';
import { RotatorService } from './services/rotator/rotator.service';
import { TextService } from './services/text/text.service';
import { PainterHelperService } from './services/painter-helper/painter-helper.service';
import { SharedModule } from 'modules/shared/shared.module';
import { SvgNativeHelperService } from './services/svg-native-helper/svg-native-helper.service';
import { PolygonCreatorService } from './services/polygon-creator/polygon-creator.service';

/**
 * Модуль для создания и редактирования объектов на svg полотне.
 */
@NgModule({
  declarations: [
    PolygonComponent,
    TextComponent,
    EditorPanelComponent,
    MovementComponent,
    RotatorComponent
  ],
  imports: [
    InlineSVGModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    EditorPanelComponent
  ],
  providers: [
    PainterService,
    PainterHelperService,
    RotatorService,
    MovementService,
    TextService,
    MovementService,
    SvgNativeHelperService,
    PolygonCreatorService
  ]
})
export class EditorModule { }
