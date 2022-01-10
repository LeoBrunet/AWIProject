export class Allergen{
  static defaultAllergen: Allergen = new Allergen(0, 'Aucun');

  public codeAllergen: number;
  public label: string;

  constructor(codeAllergen: number, label: string) {
    this.codeAllergen = codeAllergen;
    this.label = label;
  }
}
