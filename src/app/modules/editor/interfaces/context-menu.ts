export interface ContextMenu {
  /**
   * Лейбел для пункта меню.
   */
  title: string;
  /**
   * Колбэк для обработки клика по пункту меню.
   */
  action?: Function;
  /**
   * Если пункт меню залочен.
   */
  disabled?: boolean;
}
