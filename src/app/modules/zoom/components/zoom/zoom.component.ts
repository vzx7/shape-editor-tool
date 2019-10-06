import { Component } from '@angular/core';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { ZoomService } from 'modules/zoom/services/zoom/zoom.service';
import { ToolActivateService } from 'modules/shared/services/tool-activate/tool-activate.service';
import { ToolEntity } from 'modules/shared/classes/tool-entity';
import { Tool } from 'modules/shared/interfaces/tools/tool';

/**
 * Инструмент управления масштабом.
 */
@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent extends ToolEntity implements Tool {
  constructor(
    protected readonly toolActivateService: ToolActivateService,
    private readonly zoomService: ZoomService
  ) {
    super(toolActivateService, ToolNames.ZoomingTool);
  }

  public activateTool(): void {
    super.emitActivate();
    this.zoomService.enableZoom();
  }

  public deactivateTool(): void {
    if (this.isActive) {
      this.zoomService.disableZoom();
      this.isActive = false;
    }
  }
}
