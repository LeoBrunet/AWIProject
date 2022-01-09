import {GeneralStep} from "./generalStep";

export class RecipeStep extends GeneralStep{
  public recipeId: number;

  constructor(position: number, recipeId: number) {
    super(position);
    this.recipeId = recipeId;
  }
}
