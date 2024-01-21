import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserDTO } from "../dto/user.dto";
import { JwtDTO } from "../dto/jwt.dto";
import { API_URL } from "../../constants";
import { Shot } from "../../domain/shot";
import { ShotDTO } from "../dto/shot.dto";

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private readonly apiUrl = `${API_URL}`;

    constructor(private http: HttpClient, private tokenService: TokenService) { }

    signUp(data: UserDTO): Observable<JwtDTO> {
        return this.http.post<JwtDTO>(`${this.apiUrl}/auth/register`, data);
    }

    signIn(data: UserDTO): Observable<JwtDTO> {
        return this.http.post<JwtDTO>(`${this.apiUrl}/auth/login`, data);
    }

    retrieveShots() {
        const headers = this.includeJwt();
        return this.http.post<Shot[]>(`${this.apiUrl}/my-shots`, {}, { headers })
    }
    
    createShot(shotDTO: ShotDTO): Observable<ShotDTO> {
        const headers = this.includeJwt();
        return this.http.post<ShotDTO>(`${this.apiUrl}/my-shots/create`, shotDTO, { headers })
    }
    
    includeJwt() {
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return headers;
    }
}