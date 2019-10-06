import { GeometryBase } from './geometry-base';

/**
 * Геометрия текстовых объектов.
 */
export interface LabelGeometry extends GeometryBase {
  /**
   * Координата по оси X.
   */
  x: number;

  /**
   * Координата по оси Y.
   */
  y: number;

  /**
   * Размер шрифта.
   */
  fontSize: number;

  /**
   * Font-family.
   */
  fontFamily: string;

  /**
   * Текст.
   */
  text: string;

  /**
   * Ширина.
   */
  width: number;

  /**
   * Высота.
   */
  height: number;
}
