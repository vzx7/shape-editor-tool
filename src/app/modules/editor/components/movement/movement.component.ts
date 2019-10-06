import { Component, Input } from '@angular/core';
import { MovementService } from 'modules/editor/services/movement/movement.service';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { ToolActivateService } from 'modules/shared/services/tool-activate/tool-activate.service';
import { ToolEntity } from 'modules/shared/classes/tool-entity';
import { Tool } from 'modules/shared/interfaces/tools/tool';
import { EditorState } from 'modules/shared/interfaces/editor/editor-state';

/**
 * Компонент инструмента перемещения объекта.
 */
@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent extends ToolEntity implements Tool {
  /**
   * Состояние редактора.
   */
  @Input() public editorState: EditorState;
  constructor(
    private readonly movingService: MovementService,
    protected readonly toolActivateService: ToolActivateService
  ) {
    super(toolActivateService, ToolNames.MovementTool);
   }

  public activateTool(): void {
    super.emitActivate();
    this.movingService.enable(this.editorState);
  }

  public deactivateTool(): void {
    if (this.isActive) {
      this.movingService.disable();
      this.isActive = false;
    }
  }
}
