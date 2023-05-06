import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  name: String | undefined;
  login: String | undefined;
  email: String | undefined;
  password: String | undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  userRegisterSubmit() {
    const user = {
      name: this.name,
      login: this.login,
      email: this.email,
      password: this.password
    };

    this.authService.signUpUser(user).subscribe(data => {
      if(!data._id) {
        this.router.navigate(['/reg']).then(() => console.log('Something went wrong'));
      } else {
        this.router.navigate(['/auth']).then(() => console.log('Sign Up success'));
      }
    });
  }
}
