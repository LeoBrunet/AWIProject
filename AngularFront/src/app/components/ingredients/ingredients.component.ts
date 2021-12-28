import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Ingredient} from "../../model/ingredients";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {RecipeService} from "../../../services/RecipeService";
import {IngredientCategory} from "../../model/ingredientCategory";

@Component({
  selector: 'ingredients',
  templateUrl: 'ingredients.component.html',
  styleUrls: ['../../../assets/css/home.css',
    '../../../assets/css/home_right.css']
})
export class IngredientsComponent implements OnInit {
  @Input() ingredients: Ingredient[];
  @Input() categories: IngredientCategory[];
  @Input() selectedCategory: IngredientCategory;
  ingredientsFormGroup: FormGroup;

  constructor(private _fb: FormBuilder, private _recipeService: RecipeService, private ref:ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.ingredientsFormGroup =
      this._fb.group({
        ingredientFormArray: this._fb.array([])
      });
    for (let index: number = 0; index < this.ingredients.length; index++) {
      this.getIngredientsArray().push(this._fb.group({
        name: [this.ingredients[index].name],
        unit: [this.ingredients[index].unit]
      }));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ingredients = changes.ingredients.currentValue;
    this.ingredientsFormGroup =
      this._fb.group({
        ingredientFormArray: this._fb.array([])
      });
    for (let index: number = 0; index < this.ingredients.length; index++) {
      this.getIngredientsArray().push(this._fb.group({
        name: [this.ingredients[index].name],
        unit: [this.ingredients[index].unit]
      }));
    }
  }

  public updateNameIngredient(index: number): void {
    this.ingredients[index].name = this.getIngredientsArray().controls[index].get('name')?.value;
  }

  public updateUnitIngredient(index: number): void {
    this.ingredients[index].unit = this.getIngredientsArray().controls[index].get('unit')?.value;
  }

  public updateCategoryIngredient(index: number, name: string): void {
    let cat = this.categories.find(i => i.name == name);
    if (cat)
      this.ingredients[index].category = cat;
  }

  public getIngredientsArray() {
    return this.ingredientsFormGroup.get('ingredientFormArray') as FormArray;
  }

  public removeIngredientAtIndex(index: number): void {
    this.getIngredientsArray().removeAt(index);
    this.ingredients.forEach((elementI, indexI) => {
      if (indexI == index) this.ingredients.splice(indexI, 1);
    });
  }

  public addIngredient(): void {

    if (this.ingredients.length == 0) {
      this.ingredients.push(new Ingredient(1, "", ""))
      this.getIngredientsArray().push(this._fb.group({
        name: [this.ingredients[this.ingredients.length - 1].name],
        unit: [this.ingredients[this.ingredients.length - 1].unit]
      }));
    }

    if (this.ingredients[this.ingredients.length-1].name != "" && this.ingredients[this.ingredients.length-1].unit != "") {
      this.ingredients.push(new Ingredient(this.ingredients[this.ingredients.length - 1].id + 1, "", ""))
      this.getIngredientsArray().push(this._fb.group({
        name: [this.ingredients[this.ingredients.length - 1].name],
        unit: [this.ingredients[this.ingredients.length - 1].unit]
      }));
    }
    else {
      //TODO Print error on screen
      console.log("Modfier d'abord le dernier ajout.")
    }
  }

  public getCategoryName(index): string {
    return this.ingredients[index].category.name;
  }

  public getCategoryId(index): number {
    return this.ingredients[index].category.id;
  }

  public getAllCategories(index): IngredientCategory[] {
    let returnedCategories: IngredientCategory[] = this.categories;
    if (this.ingredients.length > index) {
      returnedCategories.forEach((elementI, indexI) => {
        if (elementI.name == this.ingredients[index].category.name) returnedCategories.splice(indexI, 1);
      });
      returnedCategories.sort(function (a, b) {
        return a.id - b.id
      })
      returnedCategories.unshift(this.ingredients[index].category)
    }
    return returnedCategories;
  }
}
