import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IngredientCategory} from "../app/model/ingredientCategory";
import {GeneralServiceInterface} from "./GeneralService";

const baseUrl = GeneralServiceInterface.baseUrl + '/ingredientType';

@Injectable({
  providedIn: 'root'
})
export class IngredientCategoryService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(baseUrl);
    //return [new IngredientCategory(1, 'Viande'), new IngredientCategory(2, 'Poisson'), new IngredientCategory(3, 'Autre')];
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  //TODO Check create
  create(ingredientCategory) {
    return this.http.post(baseUrl, {idType: ingredientCategory.id, label: ingredientCategory.name})
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  public createIngredientCategory(data): IngredientCategory {
    return new IngredientCategory(data['idType'], data['label'])
  }
}
