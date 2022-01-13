import {GeneralStep} from "./generalStep";

export class RecipeStep extends GeneralStep{
  public recipeId: number;
  public recipeName : string;
  public recipeDesc : string;


  constructor(position: number, recipeId: number, recipeName: string, recipeDesc: string) {
    super(position);
    this.recipeId = recipeId;
    this.recipeName = recipeName;
    this.recipeDesc = recipeDesc;
  }
}
