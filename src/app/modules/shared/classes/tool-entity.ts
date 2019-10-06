import { ToolNames } from '../enums/tool-names.enum';
import { ToolActivateService } from '../services/tool-activate/tool-activate.service';
import { EditorState } from '../interfaces/editor/editor-state';

/**
 * Базовый класс для Инструментов.
 */
export abstract class ToolEntity {
  /**
   * Если инструмент активен.
   */
  public isActive: boolean;
  /**
   * Имы инструмента.
   */
  private readonly toolName: ToolNames;
  constructor(
    protected readonly toolActivateService: ToolActivateService,
    protected readonly name: ToolNames
  ) {
    this.toolName = name;
    this.toolActivateService.onDeactivate.subscribe((toolNameList: ToolNames[]) => {
      if (this.isActive && toolNameList.find((item) => item === this.toolName)) {
        this.doDeactivate();
      }
    });
  }
  /**
   * Метод для активации инструмента.
   */
  public callHandler(): void {
    if (!this.isActive) {
      this.activateTool();
    } else {
      this.doDeactivate();
    }
  }
  /**
   * Метод для деактивации инструмента.
   * @param editorState состояние редактора.
   */
  protected abstract activateTool(editorState?: EditorState): void;
  /**
   * Метод для деактивации инструмента.
   */
  protected abstract deactivateTool(): void;
  /**
   * Метод для эмитирования активности.
   */
  protected emitActivate(): void {
    this.isActive = true;
    this.toolActivateService.activeMode.emit({
      toolName: this.toolName,
      isActive: true
    });
  }

  /**
   * Деактивация инструмента.
   */
  private doDeactivate(): void {
    this.deactivateTool();
  }
}
