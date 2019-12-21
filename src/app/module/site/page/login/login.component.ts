import { Component, OnInit } from '@angular/core';
import {AuthCredential} from "../../../../inteface/AuthCredential";
import {AuthService} from "../../../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  protected authCredential: AuthCredential = {
    email: null,
    password: null,
  };

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  protected login() {
    this.authService.login(this.authCredential);
  }
}
