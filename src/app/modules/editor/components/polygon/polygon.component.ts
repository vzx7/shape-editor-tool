import { Component, Input } from '@angular/core';
import { PainterService } from 'modules/editor/services/painter/painter.service';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { ToolActivateService } from 'modules/shared/services/tool-activate/tool-activate.service';
import { ToolEntity } from 'modules/shared/classes/tool-entity';
import { Tool } from 'modules/shared/interfaces/tools/tool';
import { EditorState } from 'modules/shared/interfaces/editor/editor-state';

/**
 * Компонент инструмента рисования полигона.
 */
@Component({
  selector: 'app-polygon',
  templateUrl: './polygon.component.html',
  styleUrls: ['./polygon.component.scss']
})
export class PolygonComponent extends ToolEntity  implements Tool {
  /**
   * Состояние редактора.
   */
  @Input() public editorState: EditorState;
  constructor(
    protected readonly toolActivateService: ToolActivateService,
    private readonly painterService: PainterService
  ) {
    super(toolActivateService, ToolNames.PolygonTool);
  }

  public activateTool(): void {
    super.emitActivate();
    this.painterService.enableEditing(this.editorState);
    this.painterService.drawPolygon();
  }

  public deactivateTool(): void {
    if (this.isActive) {
      this.painterService.drawPolygonStop();
      this.isActive = false;
    }
  }

  /**
   * Метод завершение создания
   */
  public endCreatePolygon(): void {
    this.painterService.endCreatePolygon();
  }
}
