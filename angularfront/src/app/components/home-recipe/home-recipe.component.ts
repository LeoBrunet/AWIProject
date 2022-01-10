import {Component, OnInit} from '@angular/core';
import {Category} from "../../model/category";
import {RecipeCategoryService} from "../../../services/RecipeCategoryService";
import {Recipe} from "../../model/recipe";
import {RecipeService} from "../../../services/RecipeService";
import {Router} from "@angular/router";

@Component({
  selector: 'home-recipe',
  templateUrl: 'home-recipe.component.html',
  styleUrls: ['../../../assets/css/home.css',
    '../../../assets/css/home_right.css']
})
export class HomeRecipeComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category;
  recipes: Recipe[];
  selectedRecipes: Recipe[];

  readonly loupe = "\uD83D\uDD0E";

  ngOnInit(): void {
    //this.categories = [new Category(0, 'Tout', "all.png"),new Category(1, 'Viande', "steak.png"), new Category(2, 'Poisson', "fish_cat.png"), new Category(3, 'Autre')];
    this._recipeCategoryRecipe.getAll().subscribe((data: any) => {
      let datas: any[] = data;
      datas.forEach(data => {
          this.categories.push(this._recipeCategoryRecipe.createCategory(data))
        }
      );
    })
    this._recipeService.getAll().subscribe(async (data: any) => {
      let datas: any[] = data;
      this.recipes = [];
      for (const data1 of datas) {
        this.recipes.push(await this._recipeService.createRecipe(data1));
      }
      this.selectedRecipes = this.recipes;
    });
  }

  constructor(private router: Router, private _recipeCategoryRecipe: RecipeCategoryService, private _recipeService: RecipeService) {
  }

  newRecipe() {
    this.router.navigate(['/add-recipe']);
  }

  getSelectedCategory(category: Category) {
    this.selectedCategory = category as Category;
    if (this.selectedCategory.name == "Tout"){
      this.selectedRecipes = this.recipes;
    } else {
      this.selectedRecipes = this.recipes.filter(recipe => recipe.categoryId == this.selectedCategory.id);
    }
  }

}
