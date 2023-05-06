import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from "rxjs";

interface UserPostResponse {
  _id: any;
  success: boolean
}

interface User {
  name: String | undefined;
  login: String | undefined;
  email: String | undefined;
  password: String | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signUpUser(user: User): Observable<UserPostResponse> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<UserPostResponse>('http://localhost:3000/account/reg',
      user, { headers: headers }).pipe(map((resp: any) => resp));
  }

}
