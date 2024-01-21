import {CanActivateFn, Router, Routes} from '@angular/router'
import {MainComponent} from "./pages/main/main.component"
import {LoginComponent} from "./pages/login/login.component"
import {RegisterComponent} from "./pages/register/register.component"
import {IndexComponent} from './pages/index/index.component'
import {inject} from '@angular/core'
import { AuthGuard } from './core/guards/auth.guard'
import { AuthService } from './core/services/auth.service'

// Redirect to Main if already authenticated
const authGuardForLogin: CanActivateFn = (route, state) => {
  if (inject(AuthService).isAuthenticated()) {
    inject(Router).navigate(['main'])
  }
  return true
}

export const routes: Routes = [
  {path: '', component: IndexComponent, pathMatch: 'full'},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [authGuardForLogin]},
  {path: 'register', component: RegisterComponent, canActivate: [authGuardForLogin]},
  {path: '**', redirectTo: ''}
]
