import { Component, OnInit } from '@angular/core';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { AutocadLayersService } from 'modules/objects/services/autocad-layers/autocad-layers.service';
/**
 * @todo Описать компонент
 */
@Component({
  selector: 'app-auto-cad-layer',
  templateUrl: './auto-cad-layer.component.html',
  styleUrls: ['./auto-cad-layer.component.scss']
})
export class AutoCadLayerComponent implements OnInit {
  public isActive: boolean;
  public toolName: ToolNames;
  constructor(
    public autocadLayersService: AutocadLayersService
  ) { }
  public ngOnInit(): void { }
  public callHandler(): void {
    if (this.isActive) {
      this.deactivateTool();
    } else {
      this.activateTool();
    }
    this.autocadLayersService.isLayersActive.emit(this.isActive);
   }
  public activateTool(): void { this.isActive = true; }
  public deactivateTool(): void { this.isActive = false; }
}
