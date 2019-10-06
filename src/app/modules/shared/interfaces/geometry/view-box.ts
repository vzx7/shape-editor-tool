import { Vector } from 'modules/shared/interfaces/geometry/vector';
/**
 * Параметры видимой / выделяемой области.
 */
export interface ViewBox {
  /**
   * Положение.
   */
  position: Vector;
  /**
   * Ширина области.
   */
  width: number;
  /**
   * Высота области.
   */
  height: number;
}
