import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {Router} from "@angular/router";

@Component({
  selector: 'banner-recipe',
  templateUrl: 'banner-recipe.component.html',
  styleUrls: ['../../../assets/css/home_right.css']
})
export class BannerRecipeComponent implements OnInit {
  @Input() recipes: Recipe[];

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.recipes = changes.recipes.currentValue;
  }

  constructor(private  router : Router) {
  }

  getFirstsRecipes(): Recipe[]{
    if (this.recipes) {
      return [(this.recipes)[0], (this.recipes)[1], (this.recipes)[2]];
    }
    return [];
  }

  goToRecipe(recipe : Recipe){
    this.router.navigate(['/recipe', recipe.num]);
  }

}
