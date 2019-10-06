import { environment } from '../../../environments/environment';

/**
 * Настройки приложения.
 */
export interface RouteConfig {

  host: string;
  /**
   * Настройки api
   */
  api: {
    /**
     * Создание сущности
     */
    create: string;
    /**
     * Удаление сущности
     */
    delete: string;
    /**
     * Редактирование сущности
     */
    edit: string;

  };

}

export const routes: RouteConfig = {
  host: environment.host,
  api: {
    create: 'create',
    delete: 'delete',
    edit: 'edit'
  }
};
