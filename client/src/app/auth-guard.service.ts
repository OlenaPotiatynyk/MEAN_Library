import {Injectable} from '@angular/core';
import {Router, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): boolean | UrlTree {

    if (!this.authService.isUserLoggedIn()) {
      alert('You are not allowed to view this page. You are redirected to login Page');

      this.router.navigate(["/auth"]);
      return false;
    }
    return true;
  }
}
