import { Colors } from 'modules/shared/enums/colors.enum';
/**
 * Базовый интерфейс для элементов схемы.
 */
export interface SchemaBaseEntity {
  /**
   * ID сущности.
   */
  id: string;
  /**
   * Цвет фона объекта.
   */
  fill?: Colors;
  /**
   * Угол поворото объекта.
   */
  rotateAngle?: string;
}
