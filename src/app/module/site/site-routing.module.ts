import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SiteComponent} from './site.component';
import {AuthLayoutComponent} from "./page/auth/auth-layout/auth-layout.component";
import {NotAuthGuard} from "@app/guard/not-auth.guard";
import {AuthGuard} from "@app/guard/auth.guard";
import {PersonalDataComponent} from "@app/module/site/page/app/profile/personal-data/personal-data.component";
import {WorkExperienceComponent} from "@app/module/site/page/app/profile/work-experience/work-experience.component";
import {EducationComponent} from "@app/module/site/page/app/profile/education/education.component";
import {ContactComponent} from "@app/module/site/page/app/profile/contact/contact.component";
import {SkillComponent} from "@app/module/site/page/app/profile/skill/skill.component";
import {LanguageComponent} from "@app/module/site/page/app/profile/language/language.component";
import {FormNotSavedGuard} from "@app/guard/form-not-saved.guard";
import {PageComponent} from "@app/module/site/page/app/page/page/page.component";
import {OauthComponent} from "@app/module/site/page/auth/oauth/oauth.component";
import {AppsComponent} from "@app/module/site/page/app/oauth/apps/apps.component";
import {SettingsComponent} from "@app/module/site/page/app/profile/settings/settings.component";
import {DeleteComponent} from "@app/module/site/page/app/profile/delete/delete.component";


const routes: Routes = [
  {
    path: 'auth',
    canActivate: [NotAuthGuard],
    children: [
      {path: 'login', component: AuthLayoutComponent},
      {path: 'registration', component: AuthLayoutComponent, data: {}},
      {path: '**', component: AuthLayoutComponent}
    ]
  },
  {path: 'oauth/authorize', component: OauthComponent, data: {}},
  {
    path: 'app',
    canActivate: [AuthGuard],
    component: SiteComponent,
    children: [
      {
        path: 'profile',
        children: [
          {path: 'personal-data', component: PersonalDataComponent, canActivate: [AuthGuard], canDeactivate: [FormNotSavedGuard]},
          {path: 'experience', component: WorkExperienceComponent, canActivate: [AuthGuard], canDeactivate: [FormNotSavedGuard]},
          {path: 'education', component: EducationComponent, canActivate: [AuthGuard], canDeactivate: [FormNotSavedGuard]},
          {path: 'contact', component: ContactComponent, canActivate: [AuthGuard], canDeactivate: [FormNotSavedGuard]},
          {path: 'skill', component: SkillComponent, canActivate: [AuthGuard], canDeactivate: [FormNotSavedGuard]},
          {path: 'language', component: LanguageComponent, canActivate: [AuthGuard], canDeactivate: [FormNotSavedGuard]},
          {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
          {path: 'delete/:code', component: DeleteComponent, canActivate: [AuthGuard]},
        ]
      },
      {
        path: 'page',
        component: PageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'oauth/apps',
        component: AppsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        component: PersonalDataComponent,
        canActivate: [AuthGuard],
        canDeactivate: [FormNotSavedGuard]
      }
    ]
  },
  {path: '**', component: SiteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule {
}
