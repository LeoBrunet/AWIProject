import {Router} from "@angular/router";
import {Component, Input, OnInit} from "@angular/core";

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
      let image = element!.getElementsByTagName("img")[0]!
      image.setAttribute("src", this.getImageName())
    }
  }

  constructor(private router: Router) {
  }

  newRecipe() {
    this.router.navigate(['/add-recipe']);
  }

  getImageName(): string{
    if (this.selectedPage == 1){
      return "../../../assets/images/green-home.png";
    } else if (this.selectedPage == 2){
      return "../../../assets/images/green-recipe.png"
    } else if (this.selectedPage == 3){
      return "../../../assets/images/green-stock.png"
    }
    return ""
  }

}
