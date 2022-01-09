import {Ingredient} from "./ingredients";
import {GeneralStep} from "./generalStep";

export class Step extends GeneralStep{
  name: string;
  description: string;
  ingredients: Ingredient[];
  quantities: number[];
  duration: number;
  //image: string;

  constructor(position: number, name: string, description: string, ingredients: Ingredient[], quantities: number[], duration:number) {
    super(position);
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
    this.quantities = quantities;
    this.duration = duration;
    //this.image = image;
  }
}
