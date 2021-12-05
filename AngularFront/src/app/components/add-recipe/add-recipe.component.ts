import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Recipe} from "../../model/recipe";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'add-recipe',
  templateUrl: 'add-recipe.component.html',
  styleUrls: ['../../../assets/css/font.css',
    '../../../assets/css/form.css',
    '../../../assets/css/new_recipe_menu.css',
    '../../../assets/css/new_recipe_left.css',
    '../../../assets/css/new_recipe_right.css']
})
export class AddRecipeComponent implements OnInit {
  recipe: Recipe | undefined;
  recipeFormGroup: FormGroup;

  ngOnInit() {
    this.recipeFormGroup = new FormGroup({
      name: new FormControl(),
      desc: new FormControl(),
      nb_diners: new FormControl(),
      image: new FormControl(),
    });
  }

  submit() {
    this.openPDF()
  }

  public openPDF():void {
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
}
