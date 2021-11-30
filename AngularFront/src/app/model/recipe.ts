import {User} from "./user";

export class Recipe {
  num_recipe: number;
  name_recipe: string;
  nb_diners: number;
  auteur: User;
  image: any;

  constructor(num_recipe: number, name_recipe: string, nb_diners: number, auteur: User, image: any) {
    this.num_recipe = num_recipe;
    this.name_recipe = name_recipe;
    this.nb_diners = nb_diners;
    this.auteur = auteur;
    this.image = image;
  }
}
