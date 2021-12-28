import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IngredientCategory} from "../app/model/ingredientCategory";

//TODO Check url
const baseUrl = 'http://localhost:8080/api/ingredients_cat';

@Injectable({
  providedIn: 'root'
})
export class IngredientCategoryService {

  constructor(private http: HttpClient) { }

  getAll() {
    //return this.http.get(baseUrl);
    return [new IngredientCategory(1, 'Viande'), new IngredientCategory(2, 'Poisson'), new IngredientCategory(3, 'Autre')];
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  //TODO Check create
  create(ingredientCategory) {
    return this.http.post(baseUrl, { id: ingredientCategory.id, name: ingredientCategory.name})
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
