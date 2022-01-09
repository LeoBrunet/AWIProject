import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {GeneralServiceInterface} from "./GeneralService";

const baseUrl = GeneralServiceInterface.baseUrl + '/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(user) {
    return this.http.post(baseUrl, user);
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByEmail(email) {
    return this.http.get(`${baseUrl}/:${email}`);
  }
}
