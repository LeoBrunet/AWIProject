import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import { UserService } from "src/services/UserService";
import {User} from "../../model/user";

@Component({
  selector: 'login',
  templateUrl: 'register.component.html',
  styleUrls: ['../../../assets/css/font.css',
    '../../../assets/css/form.css',
    '../../../assets/css/login.css']
})
export class RegisterComponent implements OnInit {
  registerFormGroup : FormGroup;

  constructor(private userService : UserService) {}

  ngOnInit(): void {
    this.registerFormGroup = new FormGroup({
      email: new FormControl(),
      nameUser: new FormControl(),
      firstNameUser: new FormControl(),
      password: new FormControl()
    })
  }

  register(){
    console.log(this.registerFormGroup.get('name')?.value);
    console.log(this.registerFormGroup.get('firstNameUser')?.value);
    console.log(this.registerFormGroup.get('email')?.value);
    console.log(this.registerFormGroup.get('password')?.value);

    this.userService.create(new User(
      this.registerFormGroup.get('name')?.value,
      this.registerFormGroup.get('firstname')?.value,
      this.registerFormGroup.get('email')?.value,
      this.registerFormGroup.get('password')?.value
    ))
  }
}
