import { Component, Input } from '@angular/core';
import { RotatorService } from 'modules/editor/services/rotator/rotator.service';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { ToolActivateService } from 'modules/shared/services/tool-activate/tool-activate.service';
import { ToolEntity } from 'modules/shared/classes/tool-entity';
import { Tool } from 'modules/shared/interfaces/tools/tool';
import { EditorState } from 'modules/shared/interfaces/editor/editor-state';

/**
 * Компонент инструмента поворота объекта.
 */
@Component({
  selector: 'app-rotator',
  templateUrl: './rotator.component.html',
  styleUrls: ['./rotator.component.scss']
})
export class RotatorComponent extends ToolEntity  implements Tool {
  /**
   * Состояние редактора.
   */
  @Input() public editorState: EditorState;
  constructor(
    protected readonly toolActivateService: ToolActivateService,
    private readonly rotatorService: RotatorService
  ) {
    super(toolActivateService, ToolNames.RotatorTool);
  }

  public activateTool(): void {
    super.emitActivate();
    this.rotatorService.enableRotation(this.editorState);
  }

  public deactivateTool(): void {
    if (this.isActive) {
      this.rotatorService.disableRotation();
      this.isActive = false;
    }
  }
}
