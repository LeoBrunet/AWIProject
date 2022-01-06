import {NavigationStart, Router} from "@angular/router";
import {Component, OnInit} from "@angular/core";
import {filter} from "rxjs/operators";

@Component({
  selector: 'left-menu',
  templateUrl: 'left-menu.component.html',
  styleUrls: ['../../../assets/css/home.css']
})
export class LeftMenuComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(private router: Router) {
  }

  newRecipe() {
    this.router.navigate(['/add-recipe']);
  }

}
