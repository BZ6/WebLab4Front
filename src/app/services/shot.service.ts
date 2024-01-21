import {inject, Injectable} from '@angular/core'
import {HttpClient} from "@angular/common/http"
import {Shot} from '../domain/shot'
import {API_URL} from '../constants'
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class ShotService {
  private readonly baseUrl = `${API_URL}/my-shots`
  private http = inject(HttpClient)
  private userService = inject(UserService)

  retrieveShots() {
    return this.http.post<Shot[]>(this.baseUrl, {'username': this.userService.username, 'password': this.userService.password})
  }

  createShot(x: number | string, y: number | string, r: number | string) {
    return this.http.post<Shot>(this.baseUrl + '/create', {x, y, r, 'username': this.userService.username, 'password': this.userService.password})
  }
}
