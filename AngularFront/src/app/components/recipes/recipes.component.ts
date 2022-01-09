import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {Router} from "@angular/router";

@Component({
  selector: 'recipes',
  templateUrl: 'recipes.component.html',
  styleUrls: ['../../../assets/css/home_right.css']
})
export class RecipesComponent implements OnInit {
  @Input() recipes: Recipe[];

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.recipes = changes.recipes.currentValue;
  }

  constructor(private  router : Router) {
  }

  goToRecipe(recipe : Recipe){
    //this.router.navigateByUrl('/recipe', { state: { recipeId: 1 } });
    this.router.navigate(['/recipe', recipe.num]);
  }
}
