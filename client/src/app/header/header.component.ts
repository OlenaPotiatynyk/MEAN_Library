import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userLogin: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  userIsLogged() {
    const user = localStorage.getItem('user') || undefined;
    if(user !== undefined) {
      this.userLogin = JSON.parse(user).login;
    }
    return this.userLogin !== undefined;
  }

  userLoggedOut() {
    this.authService.logout();
    this.userLogin = undefined;
    this.router.navigate(['/auth']).then(() => console.log('Log Out success'));
  }
}
