import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Ingredient} from "../app/model/ingredients";

//TODO Check url
const baseUrl = 'http://localhost:8080/api/ingredients';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) { }

  getAll() {
    return [new Ingredient(4,'Poulet', "kg"), new Ingredient(5,'Dinde', "kg"), new Ingredient(6,'Dinde', "kg"), new Ingredient(7,'Dinde', "kg"), new Ingredient(7,'Dinde', "kg")];
    //return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  //TODO Check create
  create(ingredient) {
    return this.http.post(baseUrl, { id: ingredient.id, name: ingredient.name, unit: ingredient.unit, idCat: ingredient.category.id})
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
