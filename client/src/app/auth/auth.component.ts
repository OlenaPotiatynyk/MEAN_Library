import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  login: String | undefined;
  password: String | undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  userLoginSubmit() {
    const user = {
      login: this.login,
      password: this.password
    };

    this.authService.loginUser(user).subscribe(data => {
      if(!data.success) {
        console.log('Something went wrong');
      } else {
        this.router.navigate(['/']).then(() => console.log('Login success'));
        this.authService.storeUser(data.token, user);
      }
    })
  }
}
