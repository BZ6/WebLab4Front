import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable({
    providedIn: 'root',
})
class PermissionsService {
    constructor(
        private router: Router,
        private authService: AuthService,
        private tokenService: TokenService
    ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isAuthenticated = this.authService.isAuthenticated();
        if (!isAuthenticated) {
            this.performLogout();
        }
        return isAuthenticated;
    }

    private performLogout() {
        this.router.navigate(['login']);
    }
}

export const AuthGuard: CanActivateFn = (next, state): boolean => {
    return inject(PermissionsService).canActivate(next, state);
};
