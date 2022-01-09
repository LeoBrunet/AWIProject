import {NavigationStart, Router} from "@angular/router";
import {Component, Input, OnInit} from "@angular/core";
import {filter} from "rxjs/operators";

@Component({
  selector: 'left-menu',
  templateUrl: 'left-menu.component.html',
  styleUrls: ['../../../assets/css/home.css']
})
export class LeftMenuComponent implements OnInit {

  @Input() selectedPage: number;

  ngOnInit(): void {
    if (this.selectedPage) {
      let element = document.getElementById('menu-container')?.getElementsByClassName('menu-elem')[this.selectedPage - 1]
      element!.classList.add('selected-icon')
    }
  }

  constructor(private router: Router) {
  }

  newRecipe() {
    this.router.navigate(['/add-recipe']);
  }

}
