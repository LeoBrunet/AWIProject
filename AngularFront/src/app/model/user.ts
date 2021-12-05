export class User {
  nameUser: string;
  firstNameUser: string;
  mail: string;
  password: string;


  constructor(nameUser: string, firstNameUser: string, mail: string, password: string) {
    this.nameUser = nameUser;
    this.firstNameUser = firstNameUser;
    this.mail = mail;
    this.password = password;
  }
}
