import {Component} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {DataService} from "../data.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userName: string | undefined;
  search: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  userIsLogged() {
    const user = localStorage.getItem('user') || undefined;
    if (user) {
      this.userName = JSON.parse(user).name ? JSON.parse(user).name : JSON.parse(user).login;
    }
    return this.userName !== undefined;
  }

  userLoggedOut() {
    this.authService.logout();
    this.userName = undefined;
    this.router.navigate(['/auth']).then(() => console.log('Log Out success'));
  }

  searchSubmit(): void {
    this.router.navigate(['/home'], { queryParams: {search: this.search }}).then();
    this.search = '';
  }
}
