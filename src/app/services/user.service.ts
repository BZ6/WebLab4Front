import {inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {API_URL} from '../constants'
import {Router} from '@angular/router'
import {User} from "../domain/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = `${API_URL}/auth`
  private http = inject(HttpClient)
  private router = inject(Router)

  get username(): string | null {
    return localStorage.getItem('username')
  }

  set username(username: string | null | undefined) {
    if (username == null) localStorage.removeItem('username')
    else localStorage.setItem('username', username)
  }

  get isLoggedIn(): boolean {
    return this.password != null && this.username != null
  }

  get password(): string | null {
    return localStorage.getItem('password')  // TODO: httpOnly cookie
  }

  set password(password: string | null | undefined) {
    if (password == null) localStorage.removeItem('password')
    else localStorage.setItem('password', password)
  }

  private auth(username: string, password: string) {
    this.password = password
    this.username = username
    this.router.navigate(['main'])
  }

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
