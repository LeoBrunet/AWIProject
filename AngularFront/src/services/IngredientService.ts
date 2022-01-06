import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Ingredient} from "../app/model/ingredients";
import {IngredientCategoryService} from "./IngredientCategoryService";
import {UnitService} from "./UnitService";
import {Unit} from "../app/model/unit";

//TODO Check url
const baseUrl = 'http://localhost:8080/api/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient, private _ingredientCategoryService: IngredientCategoryService, private _unitService: UnitService) { }

  getAll() {
    //return [new Ingredient(4,'Poulet', "kg"), new Ingredient(5,'Dinde', "kg"), new Ingredient(6,'Dinde', "kg"), new Ingredient(7,'Dinde', "kg"), new Ingredient(7,'Dinde', "kg")];
    return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  //TODO Check create
  create(ingredient) {
    console.log(ingredient)
    return this.http.post(baseUrl, { numIngredient: ingredient.id, nameIngredient: ingredient.name, unitePrice: ingredient.unitePrice, codeAllergen: null, idType: ingredient.category.id, idUnit: ingredient.unit.id})
  }

  update(id, ingredient) {
    return this.http.put(`${baseUrl}/${id}`, { numIngredient: ingredient.id, nameIngredient: ingredient.name, unitePrice: ingredient.unitePrice, codeAllergen: null, idType: ingredient.category.id, idUnit: ingredient.unit.id});
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  public async createIngredient(data): Promise<Ingredient> {
    let ingredient: Ingredient;
    /*this._unitService.get(data['idUnit']).subscribe((data) => {
      let unit = this._unitService.createUnit(data);
      this._ingredientCategoryService.get(data['idType']).subscribe((data) => {
        let ingredientCategory = this._ingredientCategoryService.createIngredientCategory(data);
        ingredient = new Ingredient(data['numIngredient'], data['nameIngredient'], unit, data['unitePrice'], ingredientCategory);
      })
    })*/
    let unit = await this._unitService.get(data['idUnit']).toPromise();
    let ingredientCategory = await this._ingredientCategoryService.get(data['idType']).toPromise();
    return new Ingredient(data['numIngredient'], data['nameIngredient'], this._unitService.createUnit(unit), data['unitePrice'], this._ingredientCategoryService.createIngredientCategory(ingredientCategory));
  }
}
