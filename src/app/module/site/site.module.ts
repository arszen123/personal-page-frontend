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
import {
  MatCardModule, MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule, MatSelectModule,
  MatSlideToggleModule,
  MatTabsModule
} from "@angular/material";
import {ShowIfLoggedInDirective} from "../../directive/show-if-logged-in.directive";
import {AuthLayoutComponent} from './page/auth/auth-layout/auth-layout.component';
import {FormBuilderComponent} from './component/form-builder/form-builder.component';
import {PersonalDataComponent} from './page/app/profile/personal-data/personal-data.component';
import {WorkExperienceComponent} from './page/app/profile/work-experience/work-experience.component';
import {EducationComponent} from './page/app/profile/education/education.component';
import {SkillComponent} from './page/app/profile/skill/skill.component';
import {ContactComponent} from './page/app/profile/contact/contact.component';
import {LanguageComponent} from './page/app/profile/language/language.component';
import {ConfirmDialogComponent} from './component/confirm-dialog/confirm-dialog.component';
import { ChipFormElementComponent } from './component/chip-form-element/chip-form-element.component';
import { PageComponent } from './page/app/page/page/page.component';
import {GridstackModule} from "@libria/gridstack";
import { AddWidgetComponent } from './component/add-widget/add-widget.component';
import { SecurityComponent } from './page/app/page/security/security.component';
import { OauthComponent } from './page/auth/oauth/oauth.component';
import { AppsComponent } from './page/app/oauth/apps/apps.component';
import { SettingsComponent } from './page/app/profile/settings/settings.component';
import { DeleteComponent } from './page/app/profile/delete/delete.component';
import {WidgetModule} from "@app/module/widget/widget.module";
import {WidgetComponent} from "@app/module/site/component/widget/widget.component";


@NgModule({
  declarations: [
    NavigationComponent,
    SiteComponent,
    RegistrationComponent,
    LoginComponent,
    ShowIfLoggedInDirective,
    AuthLayoutComponent,
    FormBuilderComponent,
    PersonalDataComponent,
    WorkExperienceComponent,
    EducationComponent,
    SkillComponent,
    ContactComponent,
    LanguageComponent,
    ConfirmDialogComponent,
    ChipFormElementComponent,
    PageComponent,
    AddWidgetComponent,
    WidgetComponent,
    SecurityComponent,
    OauthComponent,
    AppsComponent,
    SettingsComponent,
    DeleteComponent
  ],
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
    MatDatepickerModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatChipsModule,
    GridstackModule.forRoot(),
    WidgetModule
  ],
  entryComponents: [
    ConfirmDialogComponent,
    AddWidgetComponent,
    SecurityComponent,
  ]
})
export class SiteModule {
}
