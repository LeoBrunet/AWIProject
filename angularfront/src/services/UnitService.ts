import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IngredientCategory} from "../app/model/ingredientCategory";
import {Ingredient} from "../app/model/ingredients";
import {Unit} from "../app/model/unit";
import {GeneralServiceInterface} from "./GeneralService";

//TODO Check url
const baseUrl = GeneralServiceInterface.baseUrl + '/unit';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  //TODO Check create
  create(unit) {
    return this.http.post(baseUrl, { idUnit: unit.id, label: unit.name})
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  public createUnit(data): Unit {
    return new Unit(data['idUnit'], data['label'])
  }
}
