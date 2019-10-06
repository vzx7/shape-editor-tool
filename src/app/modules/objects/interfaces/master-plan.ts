import { LayersToggler } from './layers-toggler';

/**
 * Интерфейс Мастер-Плана
 */
export interface MasterPlan {
  /**
   * Выставлен счет
   */
  isBilling: LayersToggler;
  /**
   * Тепловая карта.
   */
  isNegotiation: LayersToggler;
  /**
   * Свободные стенды
   */
  isFree: LayersToggler;
}
