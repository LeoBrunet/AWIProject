import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeneralServiceInterface} from "./GeneralService";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = GeneralServiceInterface.baseUrl + "/file";

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    console.log(file.name)
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  downloadFile(fileName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${fileName}`);
  }
}
