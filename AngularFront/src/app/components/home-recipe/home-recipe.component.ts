import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Category} from "../../model/category";
import {RecipeCategoryService} from "../../../services/RecipeCategoryService";
import {Recipe} from "../../model/recipe";
import {RecipeService} from "../../../services/RecipeService";

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

  ngOnInit(): void {
    //this.categories = [new Category(0, 'Tout', "all.png"),new Category(1, 'Viande', "steak.png"), new Category(2, 'Poisson', "fish_cat.png"), new Category(3, 'Autre')];
    this._recipeCategoryRecipe.getAll().subscribe((data: any) => {
      let datas: any[] = data;
      datas.forEach(data => {
          this.categories.push(this._recipeCategoryRecipe.createCategory(data))
        }
      );
    })
    this._recipeService.getAll().subscribe((data: any) => {
      let datas: any[] = data;
      this.recipes = [];
      datas.forEach(data => {
        this.recipes.push(this._recipeService.createRecipe(data));
      })
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
