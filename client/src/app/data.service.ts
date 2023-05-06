import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";

interface FilePostResponse {
  _id: any;
  success: boolean
}
interface FileRequest{
  description: String | undefined;
  file: File | undefined;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  uploadFile(file: FileRequest): Observable<FilePostResponse> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<FilePostResponse>('http://localhost:3000/upload',
      file, { headers: headers }).pipe(map((resp: any) => resp));
  }
}
