import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

/**
 * Базовый модуль приложения.
 */
@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    InlineSVGModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: './modules/main/main.module#MainModule',
          canActivate: [AuthGuard]

        },
        { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
        { path: '**', component: NotFoundComponent }
      ],

      { enableTracing: false }

    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
