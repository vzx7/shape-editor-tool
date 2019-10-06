import { Zone } from './zone';
import { Stand } from './stand';
import { Label } from './label';
import { EngineLayer } from './engine-layer';

export interface HallSchema {
  /**
   * Идентификатор
   */
  id: string;
  /**
   * Зоны.
   */
  zones?: Zone[];
  /**
   * Стэнды.
   */
  stands?: Stand[];
  /**
   * Надписи.
   */
  labels?: Label[];
  /**
   * Надписи.
   */
  engineLayers?: EngineLayer[];
}
