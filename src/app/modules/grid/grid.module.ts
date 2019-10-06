import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridPanelComponent } from './components/grid-panel/grid-panel.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { GridService } from './services/grid.service';

@NgModule({
  declarations: [GridPanelComponent],
  imports: [
    CommonModule,
    InlineSVGModule
  ],
  exports: [
    GridPanelComponent
  ],
  providers: [GridService]
})
export class GridModule { }
