import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { PolygonComponent } from '../polygon/polygon.component';
import { MovementComponent } from '../movement/movement.component';
import { RotatorComponent } from '../rotator/rotator.component';
import { TextComponent } from '../text/text.component';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { EditorStateService } from 'modules/shared/services/editor-state/editor-state.service';
import { EditorState } from 'modules/shared/interfaces/editor/editor-state';
import { ToolActivateService } from 'modules/shared/services/tool-activate/tool-activate.service';
import ToolState from 'modules/shared/interfaces/tools/tool-state';

/**
 * Компонент редактор.
 */
@Component({
  selector: 'app-editor-panel',
  templateUrl: './editor-panel.component.html',
  styleUrls: ['./editor-panel.component.scss']
})
export class EditorPanelComponent implements OnInit {
  /**
   * Компонент интсрумента рисования полигонов.
   */
  @ViewChild('polygon') public polygon: PolygonComponent;
  /**
   * Компонент инструмента перемещения объектов.
   */
  @ViewChild('movement') public movement: MovementComponent;
  /**
   * Компонент инструмента поворота объектов.
   */
  @ViewChild('rotator') public rotator: RotatorComponent;
  /**
   * Компонент инструмента тестовых объектов.
   */
  @ViewChild('text') public text: TextComponent;

  /**
   * Если редактор включен.
   */
  public isEditorActive: boolean;

  /**
   * Состояние редактора.
   */
  public editorState: EditorState;

  /**
   * Конструктор
   * @param editorStateService сервис редактирования
   * @param toolActivateService сервис активации / деактивации иснтрументов
   * @param cdr ChangeDetectorRef
   */
  constructor(
    private readonly editorStateService: EditorStateService,
    private readonly toolActivateService: ToolActivateService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.editorStateService.modeHandler.subscribe((editorState: EditorState) => {
      if (!editorState.isEditMode) {
        this.deactivateTools();
        this.isEditorActive = false;
      } else {
        this.editorState = editorState;
        this.cdr.detectChanges();
        this.activateTool();
      }
    });

    this.toolActivateService.activeMode.subscribe((toolState: ToolState) => {
      if (toolState.isActive
        && toolState.toolName !== ToolNames.MovementTool
        && toolState.toolName !== ToolNames.TextTool
        && toolState.toolName !== ToolNames.PolygonTool
        && toolState.toolName !== ToolNames.RotatorTool
      ) {
        this.isEditorActive = false;
      } else if (toolState.isActive) {
        this.isEditorActive = true;
      }
    });
  }

  public ngOnInit(): void { }

  /**
   * Активация инструмента.
   */
  private activateTool(): void {
    switch (this.editorState.toolName) {
      case ToolNames.MovementTool:
        this.movement.activateTool();
        break;

      case ToolNames.RotatorTool:
        this.rotator.activateTool();
        break;

      case ToolNames.PolygonTool:
        this.polygon.activateTool();
        break;

      case ToolNames.TextTool:
        this.text.activateTool();
        break;
    }
  }

  /**
   * Деактивация инструментов.
   */
  private deactivateTools(): void {
    this.movement.deactivateTool();
    this.rotator.deactivateTool();
    this.polygon.deactivateTool();
    this.polygon.endCreatePolygon();
    this.text.deactivateTool();
  }
}
