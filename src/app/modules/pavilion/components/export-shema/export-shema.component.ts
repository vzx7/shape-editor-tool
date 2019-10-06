import { Component, OnInit } from '@angular/core';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';

/**
 * @todo Описать компонент
 */
@Component({
  selector: 'app-export-shema',
  templateUrl: './export-shema.component.html',
  styleUrls: ['./export-shema.component.scss']
})
export class ExportShemaComponent implements OnInit {
  public toolName: ToolNames;
  public isActive: boolean;
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
