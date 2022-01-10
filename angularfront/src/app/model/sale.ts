export class Sale{
  public numSale: number;
  public quantity: number;
  public date: Date;
  public numRecipe: number;
  public nameRecipe: string;
  public cost: number;
  public price: number;

  constructor(numSale: number, quantity: number, date: Date, numRecipe: number, nameRecipe: string, cost: number, price: number) {
    this.numSale = numSale;
    this.quantity = quantity;
    this.date = date;
    this.numRecipe = numRecipe;
    this.nameRecipe = nameRecipe;
    this.price = price;
    this.cost = cost;
  }
}
