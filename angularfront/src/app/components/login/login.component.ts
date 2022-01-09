import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../../services/UserService";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['../../../assets/css/login.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup : FormGroup;

  constructor(private userService : UserService, private  router : Router) {}

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  login(){
    console.log(this.loginFormGroup.get('email')?.value);
    console.log(this.loginFormGroup.get('password')?.value);
    this.router.navigate(['/home-recipe']);
    //this.userService.findByEmail(this.loginFormGroup.get('email')?.value)
  }

}
