import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { RouterModule } from '@angular/router';
import { EditorModule } from 'modules/editor/editor.module';
import { PavilionModule } from 'modules/pavilion/pavilion.module';
import { CommonModule } from '@angular/common';
import { GridModule } from '../grid/grid.module';
import { ZoomModule } from 'modules/zoom/zoom.module';
import { MultiSelectModule } from 'modules/multi-select/multi-select.module';
import { SharedModule } from 'modules/shared/shared.module';
import { SearchModule } from 'modules/search/search.module';
import { SchemaTypeModule } from 'modules/schema-type/schema-type.module';
import { ObjectsModule } from 'modules/objects/objects.module';
import { MainService } from './services/main.service';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    SharedModule,
    GridModule,
    RouterModule.forChild([
      { path: '', component: MainComponent, pathMatch: 'prefix' }
    ]),
    EditorModule,
    PavilionModule,
    ZoomModule,
    MultiSelectModule,
    SearchModule,
    SchemaTypeModule,
    ObjectsModule
  ],
  providers: [
    MainService
  ]
})
export class MainModule {}
