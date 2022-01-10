import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ingredient} from "../app/model/ingredients";
import {IngredientCategoryService} from "./IngredientCategoryService";
import {UnitService} from "./UnitService";
import {GeneralServiceInterface} from "./GeneralService";
import {AllergenService} from "./AllergenService";
import {Allergen} from "../app/model/allergen";

const baseUrl = GeneralServiceInterface.baseUrl + '/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient, private _allergenService: AllergenService, private _ingredientCategoryService: IngredientCategoryService, private _unitService: UnitService) { }

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
    return this.http.post(baseUrl, { numIngredient: ingredient.id, nameIngredient: ingredient.name, unitePrice: ingredient.unitePrice, codeAllergen: ingredient.allergen.codeAllergen, idType: ingredient.category.id, idUnit: ingredient.unit.id, stock: ingredient.stock})
  }

  update(id, ingredient) {
    return this.http.put(`${baseUrl}/${id}`, { numIngredient: ingredient.id, nameIngredient: ingredient.name, unitePrice: ingredient.unitePrice, codeAllergen: ingredient.allergen.codeAllergen, idType: ingredient.category.id, idUnit: ingredient.unit.id, stock: ingredient.stock});
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  public async createIngredient(data): Promise<Ingredient> {
    //let ingredient: Ingredient;
    console.log(data)
    let unit = await this._unitService.get(data['idUnit']).toPromise();
    let ingredientCategory = await this._ingredientCategoryService.get(data['idType']).toPromise();
    let allergen;
    if (data['codeAllergen']) {
      let allergenData = await this._allergenService.get(data['codeAllergen']).toPromise();
       allergen = this._allergenService.createAllergen(allergenData);
    } else {
      allergen = Allergen.defaultAllergen;
    }
    return new Ingredient(data['numIngredient'], data['nameIngredient'], this._unitService.createUnit(unit), data['unitePrice'], this._ingredientCategoryService.createIngredientCategory(ingredientCategory), allergen, data['stock']);
  }
}
