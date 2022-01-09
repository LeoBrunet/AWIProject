export class Category{
  public id: number;
  public name: string;
  public image: string;

  constructor(id: number, name: string, image:string = "healthy_cat.png") {
    this.id = id;
    this.name = name;
    this.image = image;
  }
}
