import { Component } from '@angular/core';

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

  userRegisterSubmit() {
    const user = {
      name: this.name,
      login: this.login,
      email: this.email,
      password: this.password
    };


  }
}
