import { environment } from '../../../environments/environment';
import { RouteConfig } from 'core/interfaces/router-config';
/**
 * Роут лист приложения.
 */
export const routes: RouteConfig = {
  host: environment.host,
  halls: 'halls',
  stands: 'stands'
};
