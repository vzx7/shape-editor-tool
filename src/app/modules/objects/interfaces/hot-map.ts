import { Toggler } from './toggler';

/**
 * Интерфейс тепловой карты
 */
export interface HotMap {
  /**
   * Выслано на согласование
   */
  isSent: Toggler;
  /**
   * Резерв - Стадия КП
   */
  isReserve: Toggler;
}
