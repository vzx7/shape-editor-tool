import { Component, ViewChild } from '@angular/core';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { EditorStateService } from 'modules/shared/services/editor-state/editor-state.service';
import { MultiSelectService } from 'modules/multi-select/services/multi-select.service';
import { ToolEntity } from 'modules/shared/classes/tool-entity';
import { ToolActivateService } from 'modules/shared/services/tool-activate/tool-activate.service';
import { Tool } from 'modules/shared/interfaces/tools/tool';
import { MultiSelectModalComponent } from '../multi-select-modal/multi-select-modal.component';

/**
 * Инструмент управления мульти выбором.
 */
@Component({
  selector: 'app-multi-select-panel',
  templateUrl: './multi-select-panel.component.html',
  styleUrls: ['./multi-select-panel.component.scss']
})

export class MultiSelectPanelComponent extends ToolEntity  implements Tool {
  /**
   * Модал.
   */
  @ViewChild('modal') public modal: MultiSelectModalComponent;

  public isActive: boolean;

  constructor(
    protected readonly editorStateService: EditorStateService,
    protected readonly toolActivateService: ToolActivateService,
    private readonly multiSelectService: MultiSelectService,
  ) {
    super(toolActivateService, ToolNames.MultiSelectTool);
  }
  public activateTool(): void {
    super.emitActivate();
    this.multiSelectService.activate();
  }

  public deactivateTool(): void {
    if (this.isActive) {
      this.multiSelectService.deactivate();
      this.isActive = false;
      this.modal.close();
    }
  }
}
