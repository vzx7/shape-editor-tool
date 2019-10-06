import { ToolNames } from 'modules/shared/enums/tool-names.enum';

/**
 * Интерфейс для групп инструментов для деактиваци.
 */
export interface GroupTools {
  /**
   * Имя группы.
   */
  groupName: string;
  /**
   * Масси имен инструментов.
   */
  toolNames: ToolNames[];
}
