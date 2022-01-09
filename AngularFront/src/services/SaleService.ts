import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Sale} from "../app/model/sale";
import {GeneralServiceInterface} from "./GeneralService";
//TODO Check url
const baseUrl = GeneralServiceInterface.baseUrl + '/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  public createSale(data): Sale {
    return new Sale(data['numSale'], data['quantity'], new Date(data['saleDate']), data['numRecipe']);
  }
}
