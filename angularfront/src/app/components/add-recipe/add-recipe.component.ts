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
import {RecipeStep} from "../../model/recipeStep";
import {GeneralStep} from "../../model/generalStep";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'add-recipe',
  templateUrl: 'add-recipe.component.html',
  styleUrls: ['../../../assets/css/new_recipe_menu.css', '../../../assets/css/new_recipe_left.css', '../../../assets/css/new_recipe_right.css']
})
export class AddRecipeComponent implements OnInit {
  url = "https://webdav-nicolas-ig.alwaysdata.net";
  htmlOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Content-Type': 'image',
      'Authorization': 'Basic ' + btoa('nicolas-ig:Nicolas.2000'),
      'observe': 'response'
    })
  }
  categories: IngredientCategory[] = [];
  recipeCategories: Category[] = [];
  ingredients: Ingredient[] = [];
  recipe: Recipe;
  recipes: Recipe[];
  nbStepsTotal: number = 1;
  errorMessage: string;
  recipeImageLocalUrl: string = "../../assets/images/add_image.jpg";
  recipeFormGroup: FormGroup = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    desc: [''],
    nbDiners: ['', Validators.required],
    image: [''],
    steps: this._fb.array([this._fb.group({
      stepName: [''], stepDesc: ['', Validators.required], stepDuration: [10], ingredientFormArray: this._fb.array([])
    })]),
    recipeSteps: this._fb.array([])
  })

  constructor(private http: HttpClient, private _fb: FormBuilder, private _recipeService: RecipeService, private _ingredientService: IngredientService, private _ingredientCategoryService: IngredientCategoryService, private _stepService: StepService, private _recipeCategoryService: RecipeCategoryService) {
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
      console.log(this.categories)
    })
    this._recipeService.getAll().subscribe(async (data: any) => {
      this.recipes = [];
      for (const data1 of data as any[]) {
        let recipe = await this._recipeService.createRecipe(data1)
        this.recipes.push(recipe);
        console.log(recipe);
      }
    });
    for (let stepIndex: number = 0; stepIndex < this.getFormSteps().length; stepIndex++) {
      let ingredientsOfStep: FormArray = this.getIngredientsFormArray(stepIndex);
      for (let index: number = 0; index < ingredientsOfStep.length; index++) {
        this.getIngredientsFormArray(stepIndex).push(this._fb.group({
          name: [ingredientsOfStep[index].name, Validators.required],
          category: [ingredientsOfStep[index].category],
          quantity: [this.getFormSteps()[stepIndex].quantities[index]]
        }));
      }
    }
    //TODO Bouger ça
    let steps: Step[] = [new Step(1, "", "", [], [], 10)];
    let recipeSteps: RecipeStep[] = [];
    this.recipe = new Recipe("", "", 0, "", steps, recipeSteps, 0)
  }

  /* RECIPE */
  submit(): void {
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
          this._stepService.create(this.recipe.steps[index] as Step, this.recipe.num).subscribe()
        }
        for (let index = 0; index < this.recipe.recipeSteps.length; index++) {
          this._stepService.createStepRecipe(this.recipe.recipeSteps[index] as RecipeStep, this.recipe.num).subscribe()
        }
      })
    }
    //this.openPDF()
  }

  getAllValidationErrors(): string[] {
    let result: string[] = [];
    Object.keys(this.recipeFormGroup.controls).forEach(key => {
      let controlErrors = this.recipeFormGroup.get(key)!.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          if (controlErrors) {
            result.push(key)
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

  updateViewOnErrors(ids: string[]): void {
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

  printErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }

  uploadImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.recipeImageLocalUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.http.post(this.url, event.target.files[0], this.htmlOptions).subscribe(response => {
          console.log(response);
        }
      );
    }
  }

  setImage(): void {
    let input = document.getElementById('recipe-photo')
    if (input) input.click();
  }

  openPDF(): void {
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

  getRecipeName(): string {
    if (this.recipeFormGroup.get('name')?.value == "") {
      return "Nom de la recette"
    }
    return this.recipeFormGroup.get('name')?.value
  }

  getRecipeDescription(): string {
    if (this.recipeFormGroup.get('desc')?.value == "") {
      return "Lorem ipsum"
    }
    return this.recipeFormGroup.get('desc')?.value
  }

  getRecipeNbDiners(): string {
    let val = this.recipeFormGroup.get('nbDiners')?.value;
    if (val == "" || val == 1) {
      return "1 personne"
    }
    return val + " personnes"
  }

  /* RECIPE STEPS */
  public async getAllIngredientsOfRecipe(recipeId) {
    let ingredients: Ingredient[] = [];
    let quantities: number[] = [];
    await this._recipeService.getAllIngredientsOfRecipe(recipeId).then(async (data: any) => {
      for (let ingredient of data as any[]) {
        ingredients.push(await this._ingredientService.createIngredient(ingredient))
        quantities.push(ingredient.quantity)
      }
    });
    return [ingredients, quantities];
  }

  public getRecipeStepAtPosition(position): RecipeStep | undefined {
    return this.recipe.recipeSteps.find(recipe => recipe.position == position);
  }

  public getFormRecipeStepAt(position): FormGroup {
    let step = this.getRecipeStepAtPosition(position);
    let index: number = this.recipe.recipeSteps.indexOf(step!);
    return this.getRecipeSteps().controls[index] as FormGroup;
  }

  public getRecipeSteps() {
    return this.recipeFormGroup.get('recipeSteps') as FormArray;
  }

  public addRecipeStep(): void {
    this.nbStepsTotal++;
    this.recipe.recipeSteps.push(new RecipeStep(this.nbStepsTotal, this.recipes[0].num));
    this.getRecipeSteps().push(this._fb.control(this.recipes[0]));
  }

  public removeRecipeStep(): void {
    this.nbStepsTotal--;
    this.getRecipeSteps().removeAt(this.getRecipeSteps().length - 1);
    this.recipe.recipeSteps.pop();
  }

  public removeRecipeStepAt(indexRecipeStep): void {
    this.nbStepsTotal--;
    this.getRecipeSteps().removeAt(indexRecipeStep);
    this.recipe.recipeSteps.splice(indexRecipeStep, 1);
    for (let index = indexRecipeStep; index < this.recipe.recipeSteps.length; index++) {
      this.recipe.recipeSteps[index].position--;
    }
  }

  public updateSubRecipe(indexStep, recipeId): void {
    this.recipe.recipeSteps[indexStep].recipeId = recipeId;
  }

  public updateSubRecipePosition(indexStep, increment): void {
    if (this.recipe.recipeSteps[indexStep].position + increment > 0 && this.recipe.recipeSteps[indexStep].position + increment < this.nbStepsTotal + 1) {
      let newPosition = this.recipe.recipeSteps[indexStep].position + increment;
      let exStep: GeneralStep | undefined = this.recipe.steps.find(step => step.position == newPosition);
      if (exStep) {
        exStep!.position = exStep!.position - increment;
        this.recipe.recipeSteps[indexStep].position = newPosition;
        this.printErrorMessage("")
      } else {
        this.printErrorMessage("Vous ne pouvez pas déplacer cette étape dans ce sens.")
      }
    } else {
      this.printErrorMessage("Vous ne pouvez pas déplacer cette étape dans ce sens.")
    }
    return
  }

  public getPosition(indexRecipeStep): string {
    let position = this.recipe.recipeSteps[indexRecipeStep].position;
    if (position == 1) {
      return "Avant l'étape 1";
    } else {
      return "Après l'étape " + (position - 1);
    }
  }

  /* STEP */
  public getStepAtPosition(position): Step | undefined {
    return this.recipe.steps.find(step => step.position == position);
  }

  public getIndexFormStepAt(position): number {
    let step = this.getStepAtPosition(position);
    let index: number = -1;
    if (step) {
      index = this.recipe.steps.indexOf(step);
    }
    return index;
  }

  public getFormStepAt(position): FormGroup {
    let step = this.getStepAtPosition(position);
    let index: number = this.recipe.steps.indexOf(step!);
    return this.getFormSteps().controls[index] as FormGroup;
  }

  getFormSteps() {
    return this.recipeFormGroup.get('steps') as FormArray;
  }

  public addStep(): void {
    this.getFormSteps().push(this._fb.group({
      stepName: [''], stepDesc: ['', Validators.required], stepDuration: [10], ingredientFormArray: this._fb.array([])
    }));
    this.nbStepsTotal++;
    let step: Step = new Step(this.nbStepsTotal, "", "", [], [], 10);
    this.recipe.steps.push(step);
  }

  removeStep(): void {
    this.nbStepsTotal--;
    this.getFormSteps().removeAt(this.getFormSteps().length - 1);
    this.recipe.steps.pop();
  }

  removeStepAt(indexStep): void {
    this.nbStepsTotal--;
    this.getFormSteps().removeAt(indexStep);
    this.recipe.steps.splice(indexStep, 1);
    for (let index = indexStep; index < this.recipe.recipeSteps.length; index++) {
      this.recipe.recipeSteps[index].position--;
    }
  }

  /* INGREDIENTS */
  updateCategory(category: string) {
    this.recipe.categoryId = this.recipeCategories.find(cat => cat.name == category)!.id;
  }

  getAllIngredients(): Ingredient[] {
    return this.ingredients;
  }

  getIngredients(indexStep): Ingredient[] {
    return this.recipe!.steps[indexStep].ingredients
  }

  getIngredientUnit(indexStep, index): string {
    return this.recipe!.steps[indexStep].ingredients[index].unit.name
  }

  getIngredientsFormArray(indexStep: number): FormArray {
    return this.getFormSteps().controls[indexStep].get('ingredientFormArray') as FormArray;
  }

  removeIngredientAtIndex(indexStep: number, index: number): void {
    this.getIngredientsFormArray(indexStep).removeAt(index);
    this.ingredients.forEach((elementI, indexI) => {
      if (indexI == index) this.recipe!.steps[indexStep].ingredients.splice(indexI, 1);
    });
  }

  addIngredient(indexStep: number): void {
    const newIngredient: Ingredient = this.ingredients[0];
    this.recipe.steps[indexStep].ingredients.push(newIngredient);
    this.recipe.steps[indexStep].quantities[this.recipe.steps[indexStep].ingredients.length - 1] = 1;
    this.getIngredientsFormArray(indexStep).push(this._fb.group({
      category: IngredientCategory.getDefaultCategory(),
      name: [newIngredient, Validators.required],
      quantity: [this.recipe.steps[indexStep].quantities[this.recipe.steps[indexStep].ingredients.length - 1]]
    }));
  }

  getAllCategories(indexStep, index): IngredientCategory[] {
    let returnedCategories: IngredientCategory[] = Object.assign([], this.categories);
    returnedCategories.sort(function (a, b) {
      return a.name.charCodeAt(0) - b.name.charCodeAt(0)
    })
    if (returnedCategories.find(cat => cat.id == IngredientCategory.getDefaultCategory().id) === undefined) {
      returnedCategories.unshift(IngredientCategory.getDefaultCategory());
    }
    return returnedCategories;
  }

  getIngredientsOfSelectedCat(indexStep, index): Ingredient[] {
    const selectedCat = (this.getIngredientsFormArray(indexStep).controls[index] as FormGroup).controls['category'].value;
    if (selectedCat.id == 0) {
      return this.ingredients;
    }
    return this.ingredients.filter(i => i.category.id == selectedCat.id)
  }

  updateNameIngredient(indexStep: number, index: number): void {
    const newIngredientSelected = (this.getIngredientsFormArray(indexStep).controls[index] as FormGroup).controls['name'].value;
    (this.getIngredientsFormArray(indexStep).controls[index] as FormGroup).patchValue({
      //category: newIngredientSelected.category,
      name: newIngredientSelected, //quantity: 1
    });
    this.recipe.steps[indexStep].ingredients[index] = newIngredientSelected;
    this.updateQuantityIngredient(indexStep, index);
  }

  updateCategoryIngredient(indexStep: number, index: number): void {
    const newCategorySelected = (this.getIngredientsFormArray(indexStep).controls[index] as FormGroup).controls['category'].value;
    (this.getIngredientsFormArray(indexStep).controls[index] as FormGroup).patchValue({
      category: newCategorySelected, name: this.getIngredientsOfSelectedCat(indexStep, index)[0], //quantity: 1
    });
    this.updateQuantityIngredient(indexStep, index);
    this.updateNameIngredient(indexStep, index);
  }

  updateStepName(indexStep: number): void {
    this.recipe!.steps[indexStep].name = (this.getFormSteps().controls[indexStep] as FormGroup).get('stepName')?.value;
  }

  updateStepDesc(indexStep: number): void {
    this.recipe!.steps[indexStep].description = (this.getFormSteps().controls[indexStep] as FormGroup).get('stepDesc')?.value;
  }

  updateStepDuration(indexStep: number): void {
    this.recipe!.steps[indexStep].duration = (this.getFormSteps().controls[indexStep] as FormGroup).get('stepDuration')?.value;
  }

  updateQuantityIngredient(indexStep: number, index: number): void {
    this.recipe!.steps[indexStep].quantities[index] = this.getIngredientsFormArray(indexStep).controls[index].get('quantity')?.value;
  }

  getQuantity(indexStep, index) {
    return this.recipe!.steps[indexStep].quantities[index];
  }

  counter(i: number): number[] {
    return Array.from({length: i}, (v, i) => i + 1);
  }
}
