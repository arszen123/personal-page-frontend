import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {AuthCredential} from "../../../../inteface/AuthCredential";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  protected authCredential: AuthCredential = {
    email: null,
    password: null,
  };

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
}
