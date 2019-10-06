import { Component, Input } from '@angular/core';
import { TextService } from 'modules/editor/services/text/text.service';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { ToolActivateService } from 'modules/shared/services/tool-activate/tool-activate.service';
import { ToolEntity } from 'modules/shared/classes/tool-entity';
import { Tool } from 'modules/shared/interfaces/tools/tool';
import { EditorState } from 'modules/shared/interfaces/editor/editor-state';
import { EditorStateService } from 'modules/shared/services/editor-state/editor-state.service';
import { CreatedObject } from 'modules/shared/interfaces/editor/created-object';
import { ObjectType } from 'modules/shared/enums/object-type.enum';

/**
 * Компонент инструмента создания текстового объекта.
 */
@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent extends ToolEntity  implements Tool {
  /**
   * Состояние редактора.
   */
  @Input() public editorState: EditorState;
  constructor(
    private readonly textService: TextService,
    protected readonly toolActivateService: ToolActivateService,
    private readonly editorStateService: EditorStateService
  ) {
    super(toolActivateService, ToolNames.TextTool);
    this.editorStateService.createHandler.subscribe((createdObject: CreatedObject) => {
      if (createdObject.objectType === ObjectType.Stand) {
        // TODO добавить текстовые объекты по дефолту.
      }
    });
  }

  public activateTool(): void {
    super.emitActivate();
    this.textService.enableText();
  }

  public deactivateTool(): void {
    if (this.isActive) {
      this.textService.disableText();
      this.isActive = false;
    }
  }
}
