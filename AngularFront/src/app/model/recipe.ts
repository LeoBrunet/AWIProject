import {User} from "./user";

export class Recipe {
  num: number;
  name: string;
  desc: string;
  nb_diners: number;
  auteur: User;
  image: any;

  constructor(num: number, name: string, desc: string, nb_diners: number, auteur: User, image: any) {
    this.num = num;
    this.name = name;
    this.desc = desc;
    this.nb_diners = nb_diners;
    this.auteur = auteur;
    this.image = image;
  }
}
