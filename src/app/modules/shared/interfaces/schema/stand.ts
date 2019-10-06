import { SchemaBaseEntity } from './schema-base-entity';
import { Polygon } from '../geometry/polygon';
import { ObjectStatus } from 'modules/shared/enums/object-status.enum';
/**
 * Интерфейс для стендов
 */
export interface Stand extends SchemaBaseEntity {
  /**
   * Площадь стенда.
   */
  number?: string;

  /**
   * Геометрия стенда.
   */
  geometry: Polygon;

  /**
   * Площадь стенда.
   */
  square?: number;

  /**
   * Менеджер.
   */
  manager?: string;

  /**
   * Статус.
   */
  status?: ObjectStatus;

  /**
   * Название стенда на схеме.
   */
  name?: string;

  /**
   * Название участника
   */
  company?: string;
}
