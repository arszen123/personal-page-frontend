import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { NavigationComponent } from './component/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SiteComponent } from './site.component';
import { RegistrationComponent } from './page/registration/registration.component';
import { LoginComponent } from './page/login/login.component';
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material";


@NgModule({
  declarations: [NavigationComponent, SiteComponent, RegistrationComponent, LoginComponent],
  imports: [
    CommonModule,
    SiteRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    MatInputModule
  ]
})
export class SiteModule { }
