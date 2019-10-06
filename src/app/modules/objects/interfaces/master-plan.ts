import { Toggler } from './toggler';

/**
 * Интерфейс Мастер-Плана
 */
export interface MasterPlan {
  /**
   * Выставлен счет
   */
  isBilling: Toggler;
  /**
   * Тепловая карта.
   */
  isNegotiation: Toggler;
  /**
   * Свободные стенды
   */
  isFree: Toggler;
}
