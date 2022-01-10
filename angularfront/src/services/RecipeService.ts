import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Recipe} from "../app/model/recipe";
import {StepService} from "./StepService";
import {Step} from "../app/model/step";
import {RecipeStep} from "../app/model/recipeStep";
import {GeneralServiceInterface} from "./GeneralService";

const baseUrl = GeneralServiceInterface.baseUrl + '/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient, private _stepService: StepService) {
  }

  getAll() {
    return this.http.get(baseUrl/*, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    }*/)
    //return [new Recipe('test', 'test', 1, "../../../assets/images/fish_chips.png", []), new Recipe('test', 'test', 1, "../../../assets/images/fish_chips.png", [])]
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  async getAllIngredientsOfRecipe(id): Promise<Object> {
    return await this.http.get(`${baseUrl}/ingredients/${id}`).toPromise();
  }

  create(recipe) {
    return this.http.post(baseUrl, {
      name: recipe.name,
      nbDiners: recipe.nbDiners,
      numUser: 1,
      idCategory: recipe.categoryId,
      image: recipe.image,
      description: recipe.desc
    });
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  sell(recipeId, nbDiners, cost, price) {
    return this.http.post(`${baseUrl}/sell/${recipeId}`, {quantity: nbDiners, price: price, cost: cost});
  }

  public async createRecipe(data): Promise<Recipe> {
    let steps: Step[] = [];
    let recipeSteps: RecipeStep[] = [];
    await this._stepService.getAllOfRecipe(data['numRecipe']).then(async (response) => {
      await this._stepService.createAllStepsOfRecipe(response).then(stepsResponse => {
        steps = stepsResponse;
      });
      await this._stepService.createAllRecipeStepsOfRecipe(response).then(stepsResponse => {
        recipeSteps = stepsResponse;
      });
    });
    return new Recipe(data['name'], data['description'], data['nbDiners'], data['image'], steps, recipeSteps, data['idCategory'], data['numRecipe'], data['duration'], data['ingredientCost'])
  }
}
