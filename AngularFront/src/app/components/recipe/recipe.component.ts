import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Recipe} from "../../model/recipe";
import {RecipeService} from "../../../services/RecipeService";
import {Ingredient} from "../../model/ingredients";
import {IngredientService} from "../../../services/IngredientService";

@Component({
  selector: 'recipe',
  templateUrl: 'recipe.component.html',
  styleUrls: ['../../../assets/css/home.css',
    '../../../assets/css/home_right.css',
    '../../../assets/css/font.css']
})
export class RecipeComponent implements OnInit {
  @Input() recipe: Recipe;
  ingredients: Ingredient[] = [];
  quantities: number[] = [];
  originalNbDiners: number;

  //TODO Modifier
  //TODO Vendre

  constructor(private router: Router, private route: ActivatedRoute, private _recipeService: RecipeService, private _ingredientService: IngredientService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      await this._recipeService.get(params['id']).subscribe(
        async (data) => {
          this.recipe = await this._recipeService.createRecipe(data);
          this.originalNbDiners = this.recipe.nbDiners;
          console.log(this.recipe)
        }
      );
      await this._recipeService.getAllIngredientsOfRecipe(params['id']).then(
        async (data: any) => {
          for (let ingredient of data as any[]) {
            this.ingredients.push(await this._ingredientService.createIngredient(ingredient))
            this.quantities.push(ingredient.quantity)
          }
        }
      );
    });

  }

  getNbDiners() {
    let val = this.recipe.nbDiners;
    if (val == 1) {
      return "1 personne"
    }
    return val + " personnes"
  }

  updateNbDiners(increment: number) {
    if (!(increment == -1 && this.recipe.nbDiners == 1)) {
      for (let index = 0; index < this.quantities.length; index++) {
        this.quantities[index] = this.quantities[index] + ((this.quantities[index] / this.recipe.nbDiners) * increment)
      }
      for (let step of this.recipe.steps) {
        for (let index = 0; index < step.quantities.length; index++) {
          step.quantities[index] = step.quantities[index] + ((step.quantities[index] / this.recipe.nbDiners) * increment)
        }
      }
      this.recipe.nbDiners = this.recipe.nbDiners + increment;
    }
  }

  public sell(): void{
    console.log("sell")
    this._recipeService.sell(this.recipe.num, this.recipe.nbDiners).subscribe(() => this.router.navigate(['home-recipe']));
  }
}

