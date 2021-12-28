import {User} from "./user";
import {Step} from "./step";

export class Recipe {
  num: number;
  name: string;
  desc: string;
  nbDiners: number;
  auteur: User;
  image: any;
  steps: Array<Step>;

  constructor(name: string, desc: string, nbDiners: number, image: any, steps: Array<Step>) {
    this.name = name;
    this.desc = desc;
    this.nbDiners = nbDiners;
    /*this.num = num;*/
    /*this.auteur = auteur;*/
    this.image = image;
    this.steps = steps;
  }
}
