import { ObjectType } from 'modules/shared/enums/object-type.enum';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { EditorMode } from 'modules/shared/enums/editor-mode.enum';

/**
 * Модель для хранения данных (взаимодействия между редактором и другими инструментами)
 */
export interface EditorState {
  /**
   * Если включен режим редактирования.
   */
  isEditMode: boolean;

  /**
   * Имя инструмента.
   */
  toolName?: ToolNames;

  /**
   * Если включен режим редактирования.
   */
  editorMode?: EditorMode;

  /**
   * Тип редактируемого объекта.
   */
  objectType?: ObjectType;

  /**
   * ID редактируемой сущности.
   */
  objectId?: string;
}
