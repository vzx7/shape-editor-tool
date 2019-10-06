import { ToolNames } from 'modules/shared/enums/tool-names.enum';

/**
 * Модель для состояния интсрумента.
 */
export default interface ToolState {
  /**
   * Название инструмента.
   */
  toolName: ToolNames;
  /**
   * Если интрумент активен.
   */
  isActive: boolean;
}
