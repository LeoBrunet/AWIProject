import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {RecipeService} from "../../../services/RecipeService";
import {Ingredient} from "../../model/ingredients";
import {IngredientService} from "../../../services/IngredientService";
import {ActivatedRoute, Router} from "@angular/router";
import {GeneralServiceInterface} from "../../../services/GeneralService";
import {Step} from "../../model/step";
import {RecipeStep} from "../../model/recipeStep";
import {FileService} from "../../../services/FileService";
import {response} from "express";

@Component({
  selector: 'recipe',
  templateUrl: 'recipe.component.html',
  styleUrls: ['../../../assets/css/home.css','../../../assets/css/pop_up.css', '../../../assets/css/home_right.css', '../../../assets/css/font.css']
})
export class RecipeComponent implements OnInit {
  // COUTS
  ingredientCost: number;
  flavoringCost: number;
  personnelCost: number;
  fluidCost: number;
  cost: number;

  @Input() recipe: Recipe;
  ingredients: Ingredient[] = [];
  quantities: number[] = [];
  originalNbDiners: number;
  nbSales: number = 1;
  imagePath = GeneralServiceInterface.imagePath;
  //TODO Modifier
  //TODO Vendre
  constructor(private _fileService: FileService, private router: Router, private route: ActivatedRoute, private _recipeService: RecipeService, private _ingredientService: IngredientService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      await this._recipeService.getAllIngredientsOfRecipe(params['id']).then(async (data: any) => {
        for (let ingredient of data as any[]) {
          this.ingredients.push(await this._ingredientService.createIngredient(ingredient))
          this.quantities.push(ingredient.quantity)
        }
      });
      await this._recipeService.get(params['id']).subscribe(async (data) => {
        this.recipe = await this._recipeService.createRecipe(data);
        this.originalNbDiners = this.recipe.nbDiners;
        this.ingredientCost = this.recipe.ingredientCost;
        this.flavoringCost = this.recipe.ingredientCost * 0.05;
        this.personnelCost = this.recipe.duration * GeneralServiceInterface.averageMinuteRate;
        this.fluidCost = this.recipe.duration * GeneralServiceInterface.averageMinuteRateFluid;
        this.cost = +(this.recipe.ingredientCost + this.flavoringCost + this.personnelCost + this.fluidCost).toFixed(2);
        this.imagePath += this.recipe.image;
        console.log(this.recipe)
      });
    });

  }

  getNbDiners() {
    let val = this.recipe.nbDiners;
    if (val == 1) {
      return "1 personne"
    }
    return val + " personnes"
  }

  updateNbSales(increment: number) {
    if (!(increment == -1 && this.nbSales == 1)) {
      this.dismissErrorMessage()
      for (let index = 0; index < this.quantities.length; index++) {
        this.quantities[index] = this.quantities[index] + ((this.quantities[index] / this.nbSales) * increment)
        this.quantities[index] = Number(this.quantities[index].toFixed(3))
      }
      for (let step of this.recipe.steps) {
        for (let index = 0; index < step.quantities.length; index++) {
          step.quantities[index] = step.quantities[index] + ((step.quantities[index] / this.nbSales) * increment)
          step.quantities[index] = Number(step.quantities[index].toFixed(3))
        }
      }
      this.recipe.nbDiners = this.recipe.nbDiners + ((this.recipe.nbDiners / this.nbSales) * increment)
      this.ingredientCost = this.ingredientCost + ((this.ingredientCost / this.nbSales) * increment)
      this.flavoringCost = this.flavoringCost + ((this.flavoringCost / this.nbSales) * increment)
      this.personnelCost = this.personnelCost + ((this.personnelCost / this.nbSales) * increment)
      this.fluidCost = this.fluidCost + ((this.fluidCost / this.nbSales) * increment)
      this.cost = +(this.recipe.ingredientCost + this.flavoringCost + this.personnelCost + this.fluidCost).toFixed(2);
      this.nbSales = this.nbSales + increment;
    }
  }

  public sell(): void {
    console.log("sell")
    this._recipeService.sell(this.recipe.num, this.recipe.nbDiners, this.cost, this.cost * GeneralServiceInterface.sellingPriceMultiplierCoefficient).subscribe((response) => {
      console.log(response)
      if (response['sell']) {
        this.router.navigate(['/sales'])
      } else {
        this.printErrorMessage()
      }
    });
  }

  public getStepAtPosition(position): Step | undefined {
    return this.recipe.steps.find(step => step.position == position);
  }

  public getRecipeStepAtPosition(position): RecipeStep | undefined {
    return this.recipe.recipeSteps.find(recipe => recipe.position == position);
  }

  public downloadPDF() {
    this._fileService.downloadFile("recipe" + this.recipe.num + ".pdf").subscribe()
  }

  public delete() {
    console.log("supp")
    this._recipeService.delete(this.recipe.num).subscribe(response => {
      console.log(response)
      this.router.navigate(['/home-recipe'])
    });
  }

  public printPopUp() {
    document.getElementById("pop-up")!.setAttribute("style", "display: block")
  }

  public dismissPopUp() {
    document.getElementById("pop-up")!.setAttribute("style", "display: none")
  }

  public printErrorMessage() {
    document.getElementById("error-sell")!.setAttribute("style", "display: block")
  }

  public dismissErrorMessage() {
    document.getElementById("error-sell")!.setAttribute("style", "display: none")
  }

  public counter(i: number): number[] {
    return Array.from({length: i}, (v, i) => i + 1);
  }
}

