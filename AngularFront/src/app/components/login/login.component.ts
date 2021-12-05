import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../../services/UserService";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['../../../assets/css/font.css',
    '../../../assets/css/form.css',
    '../../../assets/css/login.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup : FormGroup;

  constructor(private userService : UserService) {}

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  login(){
    console.log(this.loginFormGroup.get('email')?.value);
    console.log(this.loginFormGroup.get('password')?.value);

    this.userService.findByEmail(this.loginFormGroup.get('email')?.value)
  }

}
