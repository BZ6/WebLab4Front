import {CanActivateFn, Router, Routes} from '@angular/router'
import {MainComponent} from "./pages/main/main.component"
import {LoginComponent} from "./pages/login/login.component"
import {RegisterComponent} from "./pages/register/register.component"
import {IndexComponent} from './pages/index/index.component'
import {inject} from '@angular/core'
import {UserService} from './services/user.service'


const authGuardForMain: CanActivateFn = (route, state) => {
  if (inject(UserService).isLoggedIn) return true
  inject(Router).navigate([''])
  return true
}

const authGuardForLogin: CanActivateFn = (route, state) => {
  if (!inject(UserService).isLoggedIn) return true
  inject(Router).navigate([''])
  return true
}

export const routes: Routes = [
  {path: '', component: IndexComponent, pathMatch: 'full'},
  {path: 'main', component: MainComponent, canActivate: [authGuardForMain]},
  {path: 'login', component: LoginComponent, canActivate: [authGuardForLogin]},
  {path: 'register', component: RegisterComponent, canActivate: [authGuardForLogin]},
  {path: '**', redirectTo: ''}
]
