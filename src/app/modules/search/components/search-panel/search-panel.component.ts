import { Component, OnInit } from '@angular/core';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';

/**
 * Компонент поиска на схеме.
 */
@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  public isActive: boolean;
  public toolName: ToolNames;
  constructor() { }
  public ngOnInit(): void { }
  public callHandler(): void {
    if (this.isActive) {
      this.deactivateTool();
    } else {
      this.activateTool();
    }
   }
  public activateTool(): void { this.isActive = true; }
  public deactivateTool(): void { this.isActive = false; }
}
