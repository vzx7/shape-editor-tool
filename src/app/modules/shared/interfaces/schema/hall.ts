import { Zone } from './zone';
import { Stand } from './stand';
import { EngineLayer } from './engine-layer';
import { LabelGeometry } from '../geometry/label-geometry';
import { Label } from './label';

/**
 * Интерфейс для схемы.
 */
export interface Hall {

  /**
   * Идентификатор
   */
  id: string;
  /**
   * Павильон.
   */
  pavilion: string;
  /**
   * Площадь.
   */
  square: number;
  /**
   * Можно забронировать.
   */
  freeToBook: string;
  /**
   * Свободно
   */
  availible: string;
  /**
   * Резерв.
   */
  reserve: string;
  /**
   * Продано.
   */
  sold: string;
  /**
   * Зоны.
   */
  zones: Zone[];
  /**
   * Стэнды.
   */
  stands: Stand[];
  /**
   * Инжинерные слои.
   */
  engineLayers: EngineLayer[];
  /**
   * Надписи.
   */
  labels: Label[];

}
