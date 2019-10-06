import { Toggler } from './toggler';

/**
 * Интерфейс для опций в футере КП
 */
export interface Options {
  /**
   * Взаиморасчет
   */
  netting: Toggler;
  /**
   * Вип
   */
  vip: Toggler;
}
