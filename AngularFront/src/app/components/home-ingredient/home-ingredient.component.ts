import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../../model/ingredients";
import {IngredientCategory} from "../../model/ingredientCategory";
import {Category} from "../../model/category";

@Component({
  selector: 'home-ingredient',
  templateUrl: 'home-ingredient.component.html',
  styleUrls: ['../../../assets/css/home.css',
    '../../../assets/css/home_right.css']
})
export class HomeIngredientComponent implements OnInit {
  //TODO get it from database
  ingredients: Ingredient[] = [];
  selectedIngredients: Ingredient[] = [];
  categories: Array<IngredientCategory> = [];
  selectedCategory: IngredientCategory;

  ngOnInit(): void {
    this.ingredients = [new Ingredient(1,'Poulet', "kg"), new Ingredient(2,'Dinde', "kg"), new Ingredient(3,'Dinde', "kg"), new Ingredient(4,'Dinde', "kg"), new Ingredient(5,'Dinde', "kg")];
    this.categories = [new IngredientCategory(0, 'Tout', "all.png"),new IngredientCategory(1, 'Viande', "steak.png"), new IngredientCategory(2, 'Poisson', "fish_cat.png"), new IngredientCategory(3, 'Autre')];
    this.selectedIngredients = this.ingredients;
    this.selectedCategory = this.categories[0];
  }

  getSelectedCategory(category: Category){
    this.selectedCategory = category as IngredientCategory;
    if (this.selectedCategory.name == "Tout"){
      this.selectedIngredients = this.ingredients;
    } else {
      this.selectedIngredients = this.ingredients.filter(ingredient => ingredient.category.name == this.selectedCategory.name)
    }
  }
}

