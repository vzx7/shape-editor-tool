import { Vector } from './vector';

/**
 * Настройки вращения.
 */
export interface Rotation {
  /**
   * Центр вращения.
   */
  point: Vector;

  /**
   * Угол поворота.
   */
  angle: number;
}
