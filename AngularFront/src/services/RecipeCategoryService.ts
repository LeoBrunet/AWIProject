import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IngredientCategory} from "../app/model/ingredientCategory";
import {Ingredient} from "../app/model/ingredients";
import {Category} from "../app/model/category";
import {GeneralServiceInterface} from "./GeneralService";

//TODO Check url
const baseUrl = GeneralServiceInterface.baseUrl + '/category';

@Injectable({
  providedIn: 'root'
})
export class RecipeCategoryService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
    //return [new IngredientCategory(1, 'Viande'), new IngredientCategory(2, 'Poisson'), new IngredientCategory(3, 'Autre')];
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  //TODO Check create
  create(category: Category) {
    return this.http.post(baseUrl, { id: category.id, name: category.name})
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  public createCategory(data): Category {
    return new Category(data['idCategory'], data['label'])
  }
}
