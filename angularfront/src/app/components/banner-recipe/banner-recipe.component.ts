import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {Router} from "@angular/router";
import {GeneralServiceInterface} from "../../../services/GeneralService";

@Component({
  selector: 'banner-recipe',
  templateUrl: 'banner-recipe.component.html',
  styleUrls: ['../../../assets/css/home_right.css']
})
export class BannerRecipeComponent implements OnInit {
  @Input() recipes: Recipe[];
  @Input() imagesPath: string[];
  firstRecipes: Recipe[];
  readonly averageMinuteRate = GeneralServiceInterface.averageMinuteRate;
  readonly averageMinuteRateFluid = GeneralServiceInterface.averageMinuteRateFluid;

  constructor(private  router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.recipes) {
      this.recipes = changes.recipes.currentValue;
    }
    if (changes.imagesPath) {
      console.log(changes.imagesPath)
      this.imagesPath = changes.imagesPath.currentValue;
    }
  }

  ngAfterViewChecked(){
    if (this.getFirstsRecipes().length == 5 && this.imagesPath[0] != undefined && document.getElementsByClassName("banner-elem-animation")[0] == undefined) {
      let elements = document.getElementsByClassName("banner-elem");
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add("banner-elem-animation");
      }
    }
  }

  getFirstsRecipes(): Recipe[] {
    if (this.recipes && this.imagesPath[0] != undefined) {
      if (this.recipes.length > 2  && this.imagesPath[2] != undefined) {
        this.imagesPath = [(this.imagesPath)[0], (this.imagesPath)[1], (this.imagesPath)[2], (this.imagesPath)[0], (this.imagesPath)[1]];
        return [(this.recipes)[0], (this.recipes)[1], (this.recipes)[2], (this.recipes)[0], (this.recipes)[1]];
      }
    }
    return [];
  }

  goToRecipe(recipe: Recipe) {
    this.router.navigate(['/recipe', recipe.num]);
  }
}
