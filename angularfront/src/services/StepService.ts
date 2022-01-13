import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Step} from "../app/model/step";
import {Ingredient} from "../app/model/ingredients";
import {IngredientService} from "./IngredientService";
import {RecipeStep} from "../app/model/recipeStep";
import {GeneralServiceInterface} from "./GeneralService";

const baseUrl = GeneralServiceInterface.baseUrl + '/generalStep';

@Injectable({
  providedIn: 'root'
})
export class StepService {
  constructor(private http: HttpClient, private _ingredientService: IngredientService) {
  }

  getAll() {
    return this.http.get(baseUrl);
  }

  getAllOfRecipe(recipeId) {
    return this.http.get(`${baseUrl}/allOfRecipe/${recipeId}`).toPromise();
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(step: Step, recipeId: number) {
    let ingredients: string = "[";
    for (let index = 0; index < step.ingredients.length; index++) {
      ingredients += "{\"numIngredient\":" + step.ingredients[index].id + ",\"quantity\":" + step.quantities[index] + "},";
    }
    ingredients = ingredients.slice(0, ingredients.length - 1);
    ingredients += "]";
    console.log(step)
    return this.http.post(`${baseUrl}/desc`, {
      position: step.position,
      proprietaryRecipe: recipeId,
      nameStep: step.name,
      description: step.description,
      ingredients: ingredients,
      duration: step.duration
    })
  }

  createStepRecipe(step: RecipeStep, recipeId: number) {
    return this.http.post(baseUrl, {position: step.position, recipeStep: step.recipeId, proprietaryRecipe: recipeId})
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  public async createAllStepsOfRecipe(datas): Promise<Step[]> {
    let steps: Step[] = [];
    for (let data of datas) {
      let ingredients: Ingredient[] = [];
      let quantities: number[] = [];
      if (data.descriptionStep) {
        for (let ingredient of data.descriptionStep.ingredients) {
          await this._ingredientService.createIngredient(ingredient).then(response => ingredients.push(response))
          quantities.push(ingredient.ingredientInStep.quantity)
        }
        steps.push(new Step(data["position"], data["descriptionStep"]["nameStep"], data["descriptionStep"]["description"], ingredients, quantities, data["descriptionStep"]['duration']))
      }
    }
    return Promise.all(steps);
  }

  public async createAllRecipeStepsOfRecipe(datas): Promise<RecipeStep[]> {
    let steps: RecipeStep[] = [];
    for (let data of datas) {
      if (data.recipeStep) {
        steps.push(new RecipeStep(data["position"], data["recipeStep"], data["RecipeStep"]["name"], data["RecipeStep"]["description"]));
        console.log(data)
      }
    }
    return Promise.all(steps);
  }

}
