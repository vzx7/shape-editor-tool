import { Polygon } from '../geometry/polygon';
import { SchemaBaseEntity } from './schema-base-entity';
/**
 * Интерфейс для зон.
 */
export interface Zone extends SchemaBaseEntity {
  geometry: Polygon;
  name?: string;
}
