import { Polygon } from 'modules/shared/interfaces/geometry/polygon';
/**
 * Интерфейс для редактируемого полигона.
 */
export interface PolygonEditable {
  /**
   * uuid редактируемого полигона.
   */
  id: string;
  /**
   * Геометрия полигона.
   */
  geometry: Polygon;
}
