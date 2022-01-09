import {Optional} from "@angular/core";

export class User {
  numUser?: number;
  nameUser: string;
  firstNameUser: string;
  mail: string;
  password: string;


  constructor(nameUser: string, firstNameUser: string, mail: string, password: string, numUser: number = 0) {
    this.numUser = numUser ;
    this.nameUser = nameUser;
    this.firstNameUser = firstNameUser;
    this.mail = mail;
    this.password = password;
  }
}
