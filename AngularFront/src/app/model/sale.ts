export class Sale{
  public numSale: number;
  public quantity: number;
  public date: Date;
  public numRecipe: number;

  constructor(numSale: number, quantity: number, date: Date, numRecipe: number) {
    this.numSale = numSale;
    this.quantity = quantity;
    this.date = date;
    this.numRecipe = numRecipe;
  }
}
