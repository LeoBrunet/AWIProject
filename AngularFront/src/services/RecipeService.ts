import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from "../app/model/recipe";

const baseUrl = 'http://localhost:8080/api/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(baseUrl);
    //return [new Recipe('test', 'test', 1, "../../../assets/images/fish_chips.png", []), new Recipe('test', 'test', 1, "../../../assets/images/fish_chips.png", [])]
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(recipe) {
    return this.http.post(baseUrl, {
      name: recipe.name,
      nbDiners: recipe.nbDiners,
      numUser: 1,
      idCategory: recipe.category.id
    });
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  public createRecipe(data): Recipe {
    return new Recipe(data['name'], data['description'], data['nbDiners'], data['image'], [], data['idCategory'], data['numRecipe'])
  }
}
