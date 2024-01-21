import {inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {API_URL} from '../../constants'
import {Router} from '@angular/router'
import {User} from "../../domain/user"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = `${API_URL}/auth`
  private http = inject(HttpClient)
  private router = inject(Router)

  login(username: string, password: string) {
    return this.http
      .post<User>(`${this.baseUrl}/login`, {username, password})
      .subscribe((data) => this.auth(data.username, password))
  }

  register(username: string, password: string) {
    return this.http
      .post<User>(`${this.baseUrl}/register`, {username, password})
      .subscribe((data) => this.auth(data.username, password))
  }

  logout() {
    this.password = undefined
    this.username = undefined
    this.router.navigate(['login'])
  }
}
