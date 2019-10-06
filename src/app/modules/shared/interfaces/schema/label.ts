import { SchemaBaseEntity } from './schema-base-entity';
import { LabelGeometry } from '../geometry/label-geometry';

export interface Label extends SchemaBaseEntity {
  geometry: LabelGeometry;
}
