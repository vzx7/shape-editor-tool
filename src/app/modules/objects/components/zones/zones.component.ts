import { Component, OnInit } from '@angular/core';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';

/**
 * Компонент инструмента "Зоны".
 */
@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss']
})
export class ZonesComponent implements OnInit {
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
