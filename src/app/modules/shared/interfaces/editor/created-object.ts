import { ObjectType } from 'modules/shared/enums/object-type.enum';

/**
 * Объект созданного полигона.
 */
export interface CreatedObject {
  /**
   * id созданного полигона
   */
  id: string;
  /**
   * Тип созданного полигона
   */
  objectType: ObjectType;
}
