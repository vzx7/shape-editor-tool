import { MasterPlan } from './master-plan';
import { HotMap } from './hot-map';
import { Additional } from './additional';

/**
 * Интерфейс слове рабочей схемы
 */
export interface WorkingSchemeLayers {
  /**
   * Мастер-план
   */
  masterPlan: MasterPlan;
  /**
   * Тепловая карта.
   */
  hotMap: HotMap;
  /**
   * Дополнительно.
   */
  additional: Additional;
  /**
   * Дополнительно.
   */
  masterPlanOnly: boolean;
}
