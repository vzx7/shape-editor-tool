import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
  declarations: [SearchPanelComponent],
  imports: [
    CommonModule,
    InlineSVGModule
  ],
  exports: [SearchPanelComponent]
})
export class SearchModule { }
