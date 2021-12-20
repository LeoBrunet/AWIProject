import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'home-recipe',
  templateUrl: 'home-recipe.component.html',
  styleUrls: ['../../../assets/css/home.css',
    '../../../assets/css/home_right.css']
})
export class HomeRecipeComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor(private router : Router) {
  }

  newRecipe() {
    this.router.navigate(['/add-recipe']);
  }

}
