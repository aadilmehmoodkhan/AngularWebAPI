import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { Profile } from "src/app/services/model/profile";
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
    providedIn: 'root'
})
export class ProfileResolve implements Resolve<Profile>{
    constructor(
        private authService: AuthService,
        private spinner: NgxSpinnerService,) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Profile> {
        this.spinner.show();
        return this.authService.getProfile()
            .pipe(
                map(o => {
                    if(o.data.dob !== null) {
                        o.data.dob = new Date(o.data.dob)
                    }
                    this.spinner.hide();
                    return o.data;
                })
            );
    }
}