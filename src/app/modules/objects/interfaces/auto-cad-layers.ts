import { Toggler } from './toggler';

/**
 * Слои AutoCAD
 */
export interface AutoCADLayer {

/**
 * Схема зала (стены, ограничения высоты, входы, люки, навеска, разрез).
 */
  hallScheme: Toggler;
 /**
  * Классы площади
  */
  squareClass: Toggler;
 /**
  * Текстовая информация о зале
  */
  textInfo: Toggler;
 /**
  * Площадь 1-го этажа
  */
  squareFirst: Toggler;
  /**
   * Площадь 2-го этажа
   */
  squareSecond: Toggler;
  /**
   * Высота потолка
   */
  ceilingHeight: Toggler;
  /**
   * Контуры площадей
   */
  outline: Toggler; // TODO разобраться, что за контуры и вероятно переименовать
  /**
   * Базовые планировки
   */
  baseLayout: Toggler;
  /**
   * Текущая инженерная планировка стендов
   */
  currentLayout: Toggler;

}
