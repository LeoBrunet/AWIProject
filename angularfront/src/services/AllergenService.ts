import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GeneralServiceInterface} from "./GeneralService";
import {Allergen} from "../app/model/allergen";

//TODO Check url
const baseUrl = GeneralServiceInterface.baseUrl + '/allergen';

@Injectable({
  providedIn: 'root'
})
export class AllergenService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(allergen) {
    return this.http.post(baseUrl, { label: allergen.label, codeAllergen: allergen.codeAllergen})
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  public createAllergen(data): Allergen {
    return new Allergen(data['codeAllergen'], data['label'])
  }
}
