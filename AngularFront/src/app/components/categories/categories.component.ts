import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Category} from "../../model/category";
@Component({
  selector: 'categories',
  templateUrl: 'categories.component.html',
  styleUrls: ['../../../assets/css/home_right.css']
})
export class CategoriesComponent implements OnInit {
  @Input() categories: Category[];
  selectedCategory: Category;
  @Output() newCategoryEvent = new EventEmitter<Category>();

  ngOnInit(): void {
    this.selectedCategory = this.categories.find(cat => cat.name == "Tout")!
    this.setSelectedCategory(0, this.selectedCategory)
  }

  setSelectedCategory(index:number, category:Category): void {
    this.unselectAllCategories();
    this.selectedCategory = category;
    const catElem = document.getElementById('cat'+index)

    console.log(document)
    console.log(catElem)
    console.log('cat'+index)

    if(catElem){
      catElem.setAttribute("class", catElem.getAttribute("class")+" selected-category")
    }
    this.newCategoryEvent.emit(this.selectedCategory);
  }

  private unselectAllCategories(): void {
    for(let index = 0; index < this.categories.length; index++){
      const catElem = document.getElementById('cat'+index)
      if(catElem){
        catElem.setAttribute("class", "category")
      }
    }
  }

}
