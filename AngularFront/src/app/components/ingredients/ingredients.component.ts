import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Ingredient} from "../../model/ingredients";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {IngredientCategory} from "../../model/ingredientCategory";
import {IngredientService} from "../../../services/IngredientService";
import {Unit} from "../../model/unit";
import {UnitService} from "../../../services/UnitService";

@Component({
  selector: 'ingredients',
  templateUrl: 'ingredients.component.html',
  styleUrls: ['../../../assets/css/home.css',
    '../../../assets/css/home_right.css']
})
export class IngredientsComponent implements OnInit {
  @Input() ingredients: Ingredient[];
  @Input() categories: IngredientCategory[];
  @Input() dataLoaded: boolean;
  units: Unit[] = [];
  ingredientsFormGroup: FormGroup;
  errorMessage: string;

  //TODO Update Button
  //TODO Problème création (unit et cat)
  //TODO Problème suppression

  constructor(private _fb: FormBuilder, private _ingredientService: IngredientService, private _unitService: UnitService) {
  }

  ngOnInit() {
    this.initializeForm();
    this._unitService.getAll().subscribe(async (data: any) => {
      let datas: any[] = data;
      if (this.units.length == 0) {
        for (const data1 of datas) {
          let unit = await this._unitService.createUnit(data1);
          this.units.push(unit);
        }
      }
    })
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.ingredients) {
      this.ingredients = changes.ingredients.currentValue;
      this.initializeForm()
    }
    if (changes.dataLoaded) {
      this.dataLoaded = changes.dataLoaded.currentValue;
      this.ngOnInit()
    }
  }

  private updateOrCreateIngredient(ingredient: Ingredient) {
    //try {
    this._ingredientService.update(ingredient.id, ingredient).subscribe(response => {
      console.log(response);
      if (response != "Ingredient was updated successfully.") {
        this._ingredientService.create(ingredient).subscribe(response => {
          console.log(response)
        });
      }
    });
    /*} catch (){
      this._ingredientService.create(ingredient).subscribe(response => {
        console.log(response)
      });
    }*/

  }

  private deleteIngredient(ingredientId: number) {
    this._ingredientService.delete(ingredientId).subscribe(response => {
      console.log(response)
    });
  }

  public updateNameIngredient(index: number): void {
    this.ingredients[index].name = this.getIngredientsArray().controls[index].get('name')?.value;
    this.updateOrCreateIngredient(this.ingredients[index])
  }

  public updateStockIngredient(index: number): void {
    this.ingredients[index].stock = this.getIngredientsArray().controls[index].get('stock')?.value;
  }

  public updateUnitePriceIngredient(index: number): void {
    this.ingredients[index].unitePrice = this.getIngredientsArray().controls[index].get('unitePrice')?.value;
    this.updateOrCreateIngredient(this.ingredients[index])
  }

  public updateUnitIngredient(index: number, name: string): void {
    let unit = this.units.find(i => i.name == name);
    if (unit) {
      this.ingredients[index].unit = unit;
      this.updateOrCreateIngredient(this.ingredients[index])
    }
  }

  public updateCategoryIngredient(index: number, name: string): void {
    let cat = this.categories.find(i => i.name == name);
    if (cat) {
      this.ingredients[index].category = cat;
      this.updateOrCreateIngredient(this.ingredients[index])
    }
  }

  public getIngredientsArray() {
    return this.ingredientsFormGroup.get('ingredientFormArray') as FormArray;
  }

  public removeIngredientAtIndex(index: number): void {
    this.getIngredientsArray().removeAt(index);
    this.ingredients.forEach((elementI, indexI) => {
      if (indexI == index) {
        console.log(this.ingredients[indexI])
        if (this.ingredients[indexI]) {
          this.deleteIngredient(this.ingredients[indexI].id);
        }
        this.ingredients.splice(indexI, 1);
      }
    });
  }

  public addIngredient(): void {

    this.printErrorMessage("")
    if (this.ingredients.length == 0) {
      this.ingredients.push(new Ingredient(1, "", this.units[0], 1, this.categories[0]))
      this.getIngredientsArray().push(this._fb.group({
        name: [this.ingredients[this.ingredients.length - 1].name],
        unit: [this.ingredients[this.ingredients.length - 1].unit],
        stock: [this.ingredients[this.ingredients.length - 1].stock],
        unitePrice: [this.ingredients[this.ingredients.length - 1].unitePrice],
      }));
    }

    if (this.ingredients[this.ingredients.length - 1].name != "" && this.ingredients[this.ingredients.length - 1].category.name != "Tout") {
      this.ingredients.push(new Ingredient(this.ingredients[this.ingredients.length - 1].id + 1, "", this.units[0], 1, this.categories[0]))
      this.getIngredientsArray().push(this._fb.group({
        name: [this.ingredients[this.ingredients.length - 1].name],
        unit: [this.ingredients[this.ingredients.length - 1].unit],
        stock: [this.ingredients[this.ingredients.length - 1].stock],
        unitePrice: [this.ingredients[this.ingredients.length - 1].unitePrice],
      }));
    } else {
      this.printErrorMessage("Modfier d'abord le dernier ajout.")
    }
  }

  public getCategoryName(index): string {
    return this.ingredients[index].category.name;
  }

  public getCategoryId(index): number {
    return this.ingredients[index].category.id;
  }

  public getAllCategories(index): IngredientCategory[] {
    let returnedCategories: IngredientCategory[] = Object.assign([], this.categories);
    returnedCategories.splice(0, 1);
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

  private printErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }

  private initializeForm() {
    this.ingredientsFormGroup =
      this._fb.group({
        ingredientFormArray: this._fb.array([])
      });
    for (let index: number = 0; index < this.ingredients.length; index++) {
      this.getIngredientsArray().push(this._fb.group({
        name: [this.ingredients[index].name],
        stock: [this.ingredients[index].stock],
        unit: [this.ingredients[index].unit],
        unitePrice: [this.ingredients[index].unitePrice],
      }));
    }
  }
}
