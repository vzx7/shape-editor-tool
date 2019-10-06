import { Vector } from './vector';
import { GeometryBase } from './geometry-base';
/**
 * Интерфейс для геометрии полигон.
 */
export interface Polygon extends GeometryBase {
  /**
   * Координаты границ.
   */
  bound: Vector[];
  /**
   * Координаты дырок.
   */
  holes?: Vector[][];
}
