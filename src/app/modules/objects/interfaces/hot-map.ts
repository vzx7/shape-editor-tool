import { LayersToggler } from './layers-toggler';

/**
 * Интерфейс тепловой карты
 */
export interface HotMap {
  /**
   * Выслано на согласование
   */
  isSent: LayersToggler;
  /**
   * Резерв - Стадия КП
   */
  isReserve: LayersToggler;
}
