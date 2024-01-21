import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private tokenService: TokenService) {}

    isAuthenticated(): boolean {
        const token = this.tokenService.getToken();
        return !!token && !this.tokenService.isTokenExpired();
    }

    logout(): void {
        this.tokenService.removeToken();
    } 

    getUsername() {
        return this.tokenService.getUsername();
    }
}
