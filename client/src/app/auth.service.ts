import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from "rxjs";

interface UserPostResponse {
  token: string;
  _id: any;
  success: boolean
}

interface UserLogin {
  login: String | undefined;
  password: String | undefined;
}

interface User extends UserLogin {
  name: String | undefined;
  role: String | undefined;
  email: String | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: String | undefined;
  user: User | undefined;

  constructor(private http: HttpClient) {
  }

  signUpUser(user: User): Observable<UserPostResponse> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<UserPostResponse>('http://localhost:3000/account/reg',
      user, { headers: headers }).pipe(map((resp: any) => resp));
  }

  loginUser(user: UserLogin): Observable<UserPostResponse> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<UserPostResponse>('http://localhost:3000/account/auth',
      user, { headers: headers }).pipe(map((resp: any) => resp));
  }

  storeUser(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  logout() {
    this.token = undefined;
    this.user = undefined;
    localStorage.clear()
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
