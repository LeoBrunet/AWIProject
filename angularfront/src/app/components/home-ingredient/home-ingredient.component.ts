import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Ingredient} from "../../model/ingredients";
import {IngredientCategory} from "../../model/ingredientCategory";
import {Category} from "../../model/category";
import {IngredientService} from "../../../services/IngredientService";
import {IngredientCategoryService} from "../../../services/IngredientCategoryService";

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
  categories: IngredientCategory[] = [];
  selectedCategory: IngredientCategory;

  dataLoaded: boolean = false;

  readonly loupe = "\uD83D\uDD0E";

  constructor(private cdr: ChangeDetectorRef, private _ingredientService: IngredientService, private _ingredientCategoryService: IngredientCategoryService) {
  }

  ngOnInit() {
    this._ingredientService.getAll().subscribe(async (data: any) => {
      let datas: any[] = data;
      for (const data1 of datas) {
        this.ingredients.push(await this._ingredientService.createIngredient(data1))
      }
      this.selectedIngredients = this.ingredients;
      if (!this.dataLoaded) {
        this.dataLoaded = true;
      }
    })
    this._ingredientCategoryService.getAll().subscribe((data: any) => {
      let datas: any[] = data;
      datas.forEach(data => {
        this.categories.push(this._ingredientCategoryService.createIngredientCategory(data))
      })
    })
  }

  getSelectedCategory(category: Category) {
    if (category) {

      this.selectedCategory = category as IngredientCategory;
      if (this.selectedCategory.name == "Tout") {
        this.selectedIngredients = this.ingredients;
      } else {
        this.selectedIngredients = this.ingredients.filter(ingredient => ingredient.category.id == this.selectedCategory.id || ingredient.category.name == "Tout")
      }
    }
  }
}

