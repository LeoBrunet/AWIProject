import {Component, OnInit} from "@angular/core";
import {Recipe} from "../../model/recipe";
import {RecipeService} from "../../../services/RecipeService";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'select-recipe',
  templateUrl: 'select-recipe.component.html',
  styleUrls: ['../../../assets/css/home_right.css',
    '../../../assets/css/new_recipe_left.css']
})
export class SelectRecipeComponent implements OnInit{
  recipes: Recipe[];
  selectedRecipe: Recipe;
  recipeFormControl: FormControl;

  ngOnInit(): void {
    this._recipeService.getAll().subscribe(async (datas: any) => {
      this.recipes = [];
      for (const data1 of datas as any[]) {
        this.recipes.push(await this._recipeService.createRecipe(data1));
      }
      this.selectedRecipe = this.recipes[0];
    });
    this.recipeFormControl = new FormControl(this.selectedRecipe.name);
  }

  constructor(private _recipeService: RecipeService) {
  }

  updateName(recipeId: string) {
    this.selectedRecipe = this.recipes[this.recipes.findIndex((recipe: Recipe) => recipe.num == parseInt(recipeId))];
  }

}
