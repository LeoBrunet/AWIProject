import {User} from "./user";
import {Step} from "./step";
import {RecipeStep} from "./recipeStep";

export class Recipe {
  num: number;
  name: string;
  desc: string;
  nbDiners: number;
  auteur: User;
  image: any;
  categoryId: number;
  steps: Step[];
  recipeSteps: RecipeStep[];
  duration: number;
  ingredientCost: number;

  constructor(name: string, desc: string, nbDiners: number, image: any, steps: Step[], recipeSteps: RecipeStep[], categoryId: number, num: number = 0, duration: number = 0, ingredientCost: number = 0) {
    this.name = name;
    this.desc = desc;
    this.nbDiners = nbDiners;
    this.num = num;
    /*this.auteur = auteur;*/
    this.categoryId = categoryId;
    this.image = image;
    this.steps = steps;
    this.recipeSteps = recipeSteps;
    this.duration = duration;
    this.ingredientCost = ingredientCost;
  }
}
