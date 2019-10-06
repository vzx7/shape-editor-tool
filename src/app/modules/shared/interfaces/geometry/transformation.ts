import { Rotation } from './rotation';
import { Vector } from './vector';

/**
 * Объект с информацией о трансформации.
 */
export interface Transformation {
  /**
   * Информация о вращении.
   */
  rotation?: Rotation;

  /**
   * Информация о смещении.
   */
  translation?: Vector;
}
