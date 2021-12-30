import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Step} from "../app/model/step";

const baseUrl = 'http://localhost:8080/api/generalStep';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  createStep(step: Step, position: number) {
    let ingredients : string = "[";
    for (let index = 0; index < step.ingredients.length; index++){
      ingredients += "{\"numIngredient\":"+step.ingredients[index].id+",\"quantity\":"+step.quantities[index]+"},";
    }
    ingredients = ingredients.slice(0, ingredients.length - 1);
    ingredients += "]";
    console.log(step)
    return this.http.post(`${baseUrl}/desc`, {position: position+1, proprietaryRecipe: 1, nameStep: step.name, description: step.description, ingredients: ingredients})
  }

  createRecipeStep(recipe) {
    return this.http.post(baseUrl, {name: recipe.name, nbDiners: recipe.nbDiners, numUser: 1})
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
