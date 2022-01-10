import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {Router} from "@angular/router";
import {GeneralServiceInterface} from "../../../services/GeneralService";

@Component({
  selector: 'banner-recipe',
  templateUrl: 'banner-recipe.component.html',
  styleUrls: ['../../../assets/css/home_right.css']
})
export class BannerRecipeComponent implements OnInit {
  @Input() recipes: Recipe[];
  firstRecipes: Recipe[];
  readonly averageMinuteRate = GeneralServiceInterface.averageMinuteRate;
  readonly averageMinuteRateFluid = GeneralServiceInterface.averageMinuteRateFluid;

  constructor(private  router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.recipes = changes.recipes.currentValue;
  }

  getFirstsRecipes(): Recipe[] {
    if (this.recipes) {
      if (this.recipes.length > 2) {
        return [(this.recipes)[0], (this.recipes)[1], (this.recipes)[2]];
      } else if (this.recipes.length < 3) {
        return [(this.recipes)[0], (this.recipes)[1]];
      } else {
        return [(this.recipes)[0]]
      }
    }
    return [];
  }

  goToRecipe(recipe: Recipe) {
    this.router.navigate(['/recipe', recipe.num]);
  }
}
