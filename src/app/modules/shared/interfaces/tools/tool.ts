import { ToolNames } from 'modules/shared/enums/tool-names.enum';

/**
 * Интерфейс инструментов взамодействия с рабочей областью в приложение.
 */
export interface Tool {
  /**
   * Если инструмент активен.
   */
  isActive: boolean;
  /**
   * Метод для активации инструмента.
   */
  activateTool(): void;

  /**
   * Метод для деактивации инструмента.
   */
  deactivateTool(): void;
}
