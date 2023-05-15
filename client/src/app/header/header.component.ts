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
    const user = localStorage.getItem('user') || '';
    if(user !== '') {
      this.userLogin = JSON.parse(user).login;
    }
    console.log(this.userLogin);
    return this.userLogin !== '';
  }

  userLoggedOut() {
    this.authService.logout();
    this.router.navigate(['/auth']).then(() => console.log('Log Out success'));
  }
}
