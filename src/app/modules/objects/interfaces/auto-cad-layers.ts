import { LayersToggler } from './layers-toggler';

/**
 * Слои AutoCAD
 */
export interface AutoCADLayer {

/**
 * Схема зала (стены, ограничения высоты, входы, люки, навеска, разрез).
 */
  hallScheme: LayersToggler;
 /**
  * Классы площади
  */
  squareClass: LayersToggler;
 /**
  * Текстовая информация о зале
  */
  textInfo: LayersToggler;
 /**
  * Площадь 1-го этажа
  */
  squareFirst: LayersToggler;
  /**
   * Площадь 2-го этажа
   */
  squareSecond: LayersToggler;
  /**
   * Высота потолка
   */
  ceilingHeight: LayersToggler;
  /**
   * Контуры площадей
   */
  outline: LayersToggler; // TODO разобраться, что за контуры и вероятно переименовать
  /**
   * Базовые планировки
   */
  baseLayout: LayersToggler;
  /**
   * Текущая инженерная планировка стендов
   */
  currentLayout: LayersToggler;

}
