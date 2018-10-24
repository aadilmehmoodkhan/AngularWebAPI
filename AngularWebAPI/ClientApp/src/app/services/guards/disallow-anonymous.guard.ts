import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth.service";

@Injectable({ 
    providedIn: 'root' 
})
export class DisallowAnonymous implements CanActivate  {
    constructor(private authService: AuthService) {

    }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.authService.UserLoggedIn;
    }
}