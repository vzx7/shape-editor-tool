import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { RouterModule } from '@angular/router';
import { EditorModule } from 'modules/editor/editor.module';
import { WorkAreaService } from '../shared/services/work-area/work-area.service';
import { CommonModule } from '@angular/common';
import { GridModule } from '../grid/grid.module';
import { ZoomModule } from 'modules/zoom/zoom.module';
import { MultiSelectModule } from 'modules/multi-select/multi-select.module';
import { SharedModule } from 'modules/shared/shared.module';
import { SearchModule } from 'modules/search/search.module';
import { ObjectsModule } from 'modules/objects/objects.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    GridModule,
    RouterModule.forChild([
      { path: '', component: MainComponent, pathMatch: 'prefix' }
    ]),
    EditorModule,
    ZoomModule,
    MultiSelectModule,
    SearchModule,
    ObjectsModule,
    SharedModule
  ],
  providers: [
    WorkAreaService
  ]
})
export class MainModule {}
