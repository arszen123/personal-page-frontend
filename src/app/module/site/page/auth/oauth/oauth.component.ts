import {Component, OnInit} from '@angular/core';
import {AuthService} from "@app/service/auth.service";
import {OauthService} from "@app/service/oauth.service";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.scss']
})
export class OauthComponent implements OnInit {
  private isLoggedIn: boolean = false;
  private checkClient: any;
  private authData: any;
  private isAllowedAuthorization = true;

  constructor(
    private authService: AuthService,
    private oAuth: OauthService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (window.opener === null) {
      this.isAllowedAuthorization = false;
    }
    this.isLoggedIn = this.authService.isLoggedIn();
    this.router.queryParams.subscribe(value => {
      this.authData = {
        response_type: value.response_type,
        client_id: value.client_id,
        redirect_uri: value.redirect_uri,
        scope: value.scope
      };
      this.oAuth.checkClient(this.authData).pipe(map((value1: any) => {
        if (typeof value1.token !== 'undefined') {
          window.opener.postMessage({success: true, token: value1.token}, this.authData.redirect_uri);
        }
        return value1;
      })).subscribe(value1 => {
        this.checkClient = value1;
      })
    });
  }

  deniAuthorization() {
    window.opener.postMessage({success: false}, this.authData.redirect_uri);
  }

  authorize() {
    this.oAuth.authorize(this.authData).subscribe((value: any) => {
      window.opener.postMessage({success: true, token: value.token}, this.authData.redirect_uri);
    })
  }
}
