import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate(childRoute, state);
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/login'], {
                queryParams: {
                    accessDenied: true
                }
            });
        }
    }
}
