import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../../model/recipe";
import {RecipeService} from "../../../services/RecipeService";

@Component({
  selector: 'recipe',
  templateUrl: 'recipe.component.html',
  styleUrls: ['../../../assets/css/home.css',
    '../../../assets/css/home_right.css']
})
export class RecipeComponent implements OnInit {
  @Input() recipe: Recipe;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._recipeService.get(+params['id']).subscribe(
        (data) => {
          this.recipe = this._recipeService.createRecipe(data);
          console.log(this.recipe)
        }
      );
    });
  }

  constructor(private route: ActivatedRoute, private _recipeService: RecipeService) {
  }
}

