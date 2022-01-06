import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../model/recipe";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Step} from "../../model/step";
import {Ingredient} from "../../model/ingredients";
import {IngredientCategory} from "../../model/ingredientCategory";
import {RecipeService} from "../../../services/RecipeService";
import {IngredientService} from "../../../services/IngredientService";
import {IngredientCategoryService} from "../../../services/IngredientCategoryService";
import {StepService} from "../../../services/StepService";
import {Category} from "../../model/category";
import {RecipeCategoryService} from "../../../services/RecipeCategoryService";
import {Unit} from "../../model/unit";

@Component({
  selector: 'add-recipe',
  templateUrl: 'add-recipe.component.html',
  styleUrls: ['../../../assets/css/new_recipe_menu.css',
    '../../../assets/css/new_recipe_left.css',
    '../../../assets/css/new_recipe_right.css']
})
export class AddRecipeComponent implements OnInit {
  //TODO get it from database
  categories: IngredientCategory[] = [];
  recipeCategories: Category[] = [];
  ingredients: Ingredient[] = [];
  recipe: Recipe;

  errorMessage: string;
  recipeImageLocalUrl: string = "../../assets/images/add_image.jpg";
  recipeFormGroup: FormGroup = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    desc: [''],
    nbDiners: ['', Validators.required],
    image: [''],
    steps: this._fb.array(
      [
        this._fb.group({
          stepName: [''],
          stepDesc: ['', Validators.required],
          ingredientFormArray: this._fb.array([])
        })
      ]
    )
  })

  constructor(private _fb: FormBuilder, private _recipeService: RecipeService, private _ingredientService: IngredientService, private _ingredientCategoryService: IngredientCategoryService, private _stepService: StepService, private _recipeCategoryService : RecipeCategoryService) {
  }

  ngOnInit() {
    this._recipeCategoryService.getAll().subscribe((data: any) => {
      let datas: any[] = data;
      datas.forEach(data => {
        this.recipeCategories.push(this._recipeCategoryService.createCategory(data))
      })
      this.recipe.categoryId = this.recipeCategories[0].id
    })
    //this.ingredients = this._ingredientService.getAll();
    this._ingredientService.getAll().subscribe(async (data: any) => {
      let datas: any[] = data;
      for (const data1 of datas) {
        this.ingredients.push(await this._ingredientService.createIngredient(data1))
      }
    })
    //this.categories = this._ingredientCategoryService.getAll();
    this._ingredientCategoryService.getAll().subscribe((data: any) => {
      let datas: any[] = data;
      datas.forEach(data => {
        this.categories.push(this._ingredientCategoryService.createIngredientCategory(data))
      })
    })

    for (let stepIndex: number = 0; stepIndex < this.getSteps().length; stepIndex++) {
      let ingredientsOfStep: FormArray = this.getIngredientsFormArray(stepIndex);
      for (let index: number = 0; index < ingredientsOfStep.length; index++) {
        this.getIngredientsFormArray(stepIndex).push(this._fb.group({
          name: [ingredientsOfStep[index].name, Validators.required],
          category: [ingredientsOfStep[index].category],
          quantity: [this.getSteps()[stepIndex].quantities[index]]
        }));
      }
    }

    //TODO Bouger ça
    let steps: Array<Step> = [new Step("", "", [], [])];

    this.recipe = new Recipe(
      "",
      "",
      0,
      "",
      steps,
      0
    )
  }

  public getSteps() {
    return this.recipeFormGroup.get('steps') as FormArray;
  }

  public addStep(): void {
    this.getSteps().push(this._fb.group({
      stepName: [''],
      stepDesc: ['', Validators.required],
      ingredientFormArray: this._fb.array([])
    }));
    let step: Step = new Step("", "", [], []);
    this.recipe.steps.push(step);
  }

  public removeStep(): void {
    this.getSteps().removeAt(this.getSteps().length - 1);
    this.recipe.steps.pop();
  }

  public removeStepAt(index): void {
    this.getSteps().removeAt(index);
    this.recipe.steps.splice(index, 1);
  }

  public submit(): void {
    console.log("submit")
    console.log(this.getAllValidationErrors())
    this.updateViewOnErrors(this.getAllValidationErrors())
    if (this.recipeFormGroup.valid) {

      this.recipe.name = this.recipeFormGroup.get('name')?.value;
      this.recipe.desc = this.recipeFormGroup.get('desc')?.value;
      this.recipe.nbDiners = this.recipeFormGroup.get('nbDiners')?.value;
      this.recipe.image = this.recipeFormGroup.get('image')?.value;

      console.log(this.recipe);
      console.log("submit");
      this._recipeService.create(this.recipe).subscribe((data) => {
          this.recipe.num = data['numRecipe']
          for (let index = 0; index < this.recipe.steps.length; index++) {
            this._stepService.createStep(this.recipe.steps[index], index, this.recipe.num).subscribe()
          }
        }
      )
    }
    //this.openPDF()
  }

  private getAllValidationErrors(): string[] {

    let result: string[] = [];
    Object.keys(this.recipeFormGroup.controls).forEach(key => {

      let controlErrors = this.recipeFormGroup.get(key)!.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          if (controlErrors) {
            result.push(key)
            /*result.push({
              'control': key,
              'error': keyError,
              'value': controlErrors[keyError]
            });*/
          }
        });
      }

      if (key == "steps") {
        let stepsArray = this.recipeFormGroup.get(key) as FormArray
        if (stepsArray) {
          Object.keys(stepsArray.controls).forEach((step, index) => {
            let stepGroup = stepsArray.controls[step] as FormGroup
            if (stepGroup) {
              Object.keys(stepGroup.controls).forEach(elem => {
                let controlErrors = stepGroup.get(elem)!.errors;
                if (controlErrors) {
                  Object.keys(controlErrors).forEach(keyError => {
                    if (controlErrors) {
                      result.push(elem + index)
                      /*result.push({
                        'control': elem + index,
                        'error': keyError,
                        'value': controlErrors[keyError]
                      });*/
                    }

                  });
                }
              });
            }
          })
        }
      }
    });

    return result;
  }

  public updateViewOnErrors(ids: string[]): void {
    Object.values(ids).forEach(id => {
      const elem = document.getElementById(id);
      if (elem) {
        elem.setAttribute('style', elem.getAttribute("style") + ";box-shadow: inset 0 0 8px #ff00007a;")
      }
    })
    if (ids.length > 0) {
      this.printErrorMessage("Veuillez entrer toutes les informations de la recette.");
    }
  }

  private printErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }


  public uploadImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.recipeImageLocalUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  public setImage(): void {
    let input = document.getElementById('recipe-photo')
    if (input)
      input.click();
  }

  public openPDF(): void {
    let DATA = document.getElementById('recipeToPDF');

    if (DATA) {
      //DATA.style = "display: block; width: 100%"
      console.log(html2canvas(DATA));
      html2canvas(DATA).then(canvas => {
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;

        var FILEURI = new Image()
        FILEURI.src = canvas.toDataURL('image/png')
        console.log(FILEURI.src)
        console.log(canvas)
        FILEURI.onload = function () {
          let PDF = new jsPDF('p', 'mm', 'a4');
          let position = 0;
          PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
          PDF.save("test-recipe.pdf");
        }

      });
    }
  }

  public getRecipeName(): string {
    if (this.recipeFormGroup.get('name')?.value == "") {
      return "Nom de la recette"
    }
    return this.recipeFormGroup.get('name')?.value
  }

  public getRecipeDescription(): string {
    if (this.recipeFormGroup.get('desc')?.value == "") {
      return "Lorem ipsum"
    }
    return this.recipeFormGroup.get('desc')?.value
  }

  public getRecipeNbDiners(): string {
    let val = this.recipeFormGroup.get('nbDiners')?.value;
    if (val == "" || val == 1) {
      return "1 personne"
    }
    return val + " personnes"
  }

  public updateCategory(category : string){
    console.log(this.recipeCategories.find(cat => cat.name == category)!)
    this.recipe.categoryId = this.recipeCategories.find(cat => cat.name == category)!.id;
    console.log(this.recipe.categoryId)
  }

  /* INGREDIENTS */

  public getAllIngredients(): Ingredient[] {
    return this.ingredients;
  }

  public getIngredients(indexStep): Ingredient[] {
    return this.recipe!.steps[indexStep].ingredients
  }

  public getIngredientUnit(indexStep, index): string {
    return this.recipe!.steps[indexStep].ingredients[index].unit.name
  }

  public getIngredientsFormArray(indexStep: number): FormArray {
    return this.getSteps().controls[indexStep].get('ingredientFormArray') as FormArray;
  }

  public removeIngredientAtIndex(indexStep: number, index: number): void {
    this.getIngredientsFormArray(indexStep).removeAt(index);
    this.ingredients.forEach((elementI, indexI) => {
      if (indexI == index) this.ingredients.splice(indexI, 1);
    });
  }

  public addIngredient(indexStep: number): void {

    let ingredientId = 1;
    let ingredientsOfStep: Ingredient[] = this.getIngredients(indexStep);
    console.log(ingredientsOfStep)
    console.log(ingredientsOfStep)
    let newIngredient: Ingredient = new Ingredient(ingredientId, "", new Unit(-1, ""), 0)
    console.log(this.getIngredientsOfCat(0));
    newIngredient.name = this.getIngredientsOfCat(newIngredient.category.id)[0].name;
    newIngredient.unit = this.getIngredientsOfCat(newIngredient.category.id)[0].unit;
    newIngredient.id = this.getIngredientsOfCat(newIngredient.category.id)[0].id;
    ingredientsOfStep.push(newIngredient)
    this.recipe.steps[indexStep].ingredients = ingredientsOfStep;
    this.recipe.steps[indexStep].quantities[ingredientsOfStep.length - 1] = 0;
    this.getIngredientsFormArray(indexStep).push(this._fb.group({
      category: [newIngredient.category],
      name: [this.getIngredientsOfCat(newIngredient.category.id)[0], Validators.required],
      quantity: [this.recipe.steps[indexStep].quantities[ingredientsOfStep.length - 1]]
    }));

  }

  public getAllCategories(index): IngredientCategory[] {
    let returnedCategories: IngredientCategory[] = this.categories;
    returnedCategories.forEach((elementI, indexI) => {
      if (elementI.name == this.ingredients[index].category.name) returnedCategories.splice(indexI, 1);
    });
    returnedCategories.sort(function (a, b) {
      return a.id - b.id
    })
    returnedCategories.unshift(this.ingredients[index].category)
    return returnedCategories;
  }

  public getIngredientsOfCat(catId: number): Ingredient[] {
    return this.ingredients.filter(i => i.category.id == catId)
  }

  public updateNameIngredient(indexStep: number, index: number, name: string): void {
    let ingredient = this.ingredients.find(i => i.name == name);
    if (ingredient) {
      this.getIngredients(indexStep)[index].name = ingredient.name;
      this.getIngredients(indexStep)[index].id = ingredient.id;
      //this.getIngredientsFormArray(indexStep).controls[index].setValue(ingredient.name)
    }
  }

  public updateCategoryIngredient(indexStep: number, index: number, categoryId: string): void {
    let category = this.categories.find(i => i.id == parseInt(categoryId));
    if (category)
      this.getIngredients(indexStep)[index].category = category;
  }

  public updateStepName(indexStep: number): void {
    this.recipe.steps[indexStep].name = (this.getSteps().controls[indexStep] as FormGroup).get('stepName')?.value;
  }

  public updateStepDesc(indexStep: number): void {
    this.recipe.steps[indexStep].description = (this.getSteps().controls[indexStep] as FormGroup).get('stepDesc')?.value;
  }

  public updateQuantityIngredient(indexStep: number, index: number): void {
    this.recipe.steps[indexStep].quantities[index] = this.getIngredientsFormArray(indexStep).controls[index].get('quantity')?.value;
  }

  public getQuantity(indexStep, index) {
    return this.recipe.steps[indexStep].quantities[index];
  }

}
