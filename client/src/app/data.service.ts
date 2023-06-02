import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";

interface FilePostResponse {
  _id: any;
  success: boolean
}

interface FileRequest {
  description: String | undefined;
  file: File | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  private server = 'http://localhost:3000';

  uploadFile(file: FileRequest): Observable<FilePostResponse> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<FilePostResponse>(this.server + '/files',
      file, {headers: headers}).pipe(map((resp: any) => resp));
  }

  getFilesList(): Observable<any> {
    return this.http.get(this.server + '/files/info', {responseType:'json'});
  }

  downloadFile(id: string, name: string): void {
    this.http.get(this.server + '/files/' + id, { responseType: 'blob' }).subscribe(blob => {
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl
      a.download = name;
      a.click();
      URL.revokeObjectURL(objectUrl);
    })
  }

  search(search: string): Observable<any> {
    return this.http.get(this.server + '/files?search=' + search, {responseType:'json'});
  }

  addComment(id: string, content: string) {
    const user = localStorage.getItem('user');
    let userName;

    if(user) {
      userName = JSON.parse(user).name ? JSON.parse(user).name : JSON.parse(user).login;
    }

    const body = {
      comment: {
        author: userName,
        content: content
      }
    }

    this.http.patch(this.server + '/files/' + id, body).subscribe(resp => {
      console.log("hi this is patch request", resp);
    })
  }

  addEvaluation(id: string, evaluation: string) {
    const user = localStorage.getItem('user');
    let userName;

    if(user) {
      userName = JSON.parse(user).name ? JSON.parse(user).name : JSON.parse(user).login;
    }

    const body = {
      evaluation: {
        value: evaluation,
      }
    }

    this.http.patch(this.server + '/files/' + id, body).subscribe(resp => {
      console.log("hi this is patch request", resp);
    })
  }
}
