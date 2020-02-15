import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SiteRoutingModule} from './site-routing.module';
import {NavigationComponent} from './component/navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {SiteComponent} from './site.component';
import {RegistrationComponent} from './page/auth/registration/registration.component';
import {LoginComponent} from './page/auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule, MatInputModule, MatTabsModule} from "@angular/material";
import {ShowIfLoggedInDirective} from "../../directive/show-if-logged-in.directive";
import {AuthLayoutComponent} from './page/auth/auth-layout/auth-layout.component';
import {FormBuilderComponent} from './component/form-builder/form-builder.component';
import {PersonalDataComponent} from './page/app/profile/personal-data/personal-data.component';


@NgModule({
  declarations: [NavigationComponent, SiteComponent, RegistrationComponent, LoginComponent, ShowIfLoggedInDirective, AuthLayoutComponent, FormBuilderComponent, PersonalDataComponent],
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
    MatInputModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ]
})
export class SiteModule {
}
