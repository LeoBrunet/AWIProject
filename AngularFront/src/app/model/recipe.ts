import {User} from "./user";
import {Step} from "./step";
import {Category} from "./category";

export class Recipe {
  num: number;
  name: string;
  desc: string;
  nbDiners: number;
  auteur: User;
  image: any;
  categoryId: number;
  steps: Array<Step>;

  constructor(name: string, desc: string, nbDiners: number, image: any, steps: Array<Step>, categoryId: number, num: number = 0) {
    this.name = name;
    this.desc = desc;
    this.nbDiners = nbDiners;
    this.num = num;
    /*this.auteur = auteur;*/
    this.categoryId = categoryId;
    this.image = image;
    this.steps = steps;
  }
}
