import { Rotation } from './rotation';
import { Vector } from './vector';
import { Transformation } from './transformation';
/**
 * Базовый тип геометрии.
 */
export interface GeometryBase {
  /**
   * Тип геометрии.
   * @todo переделать в неналэбэл, когда будет реальная схема.
   */
  type?: string;

  /**
   * Настройки трансформации.
   */
  transformation?: Transformation;
}
