import { Component, OnInit } from '@angular/core';
import {OauthService} from "@app/service/oauth.service";
import {OauthClient} from "@app/interface/OauthClient";

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {
  public apps: Array<OauthClient>;

  constructor(
    private oauth: OauthService
  ) { }

  ngOnInit() {
    this.oauth.getApps().subscribe(apps => {
      this.apps = apps;
    });
  }
  public deleteApp(id: string) {
    this.oauth.deleteApp(id).subscribe(value => {
      this.oauth.getApps().subscribe(apps => {
        this.apps = apps;
      });
    })
  }
}
