import { NgModule } from '@angular/core';
import { AuthComponent } from './components/auth/auth.component';
import { RouterModule } from '@angular/router';

/**
 * Модуль для авторизации пользователя в приложение.
 */
@NgModule({
  declarations: [AuthComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: AuthComponent, pathMatch: 'prefix' }
    ])
  ]
})
export class AuthModule {}
