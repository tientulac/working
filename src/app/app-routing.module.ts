import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard} from './utils/guards/auth.guard';
import { NonAuthGuard } from './utils/guards/non-auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ChangePassComponent } from './pages/change-pass/change-pass.component';
const routes: Routes = [
  {
    path: 'admin',
    component: MainComponent,
    canActivate: [NonAuthGuard],
    canActivateChild: [NonAuthGuard],
    children: [
      {
        path: 'change-pass',
        component: ChangePassComponent,
      },
    ]
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard],
      },
    ],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule, HttpClientModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
