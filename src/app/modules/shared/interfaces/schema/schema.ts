import { Zone } from './zone';
import { Hall } from './hall';
import { Stand } from './stand';
import { EngineLayer } from './engine-layer';
import { Label } from './label';

/**
 * Интерфейс для схемы.
 */
export interface Schema {
  /**
   * Залы
   */
  halls: Hall[];
}
