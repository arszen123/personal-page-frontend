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
  {
    path: 'app',
    canActivate: [AuthGuard],
    component: SiteComponent,
    children: [
      // {path: '', component: SiteComponent},
      {path: 'personal-data', component: PersonalDataComponent, canDeactivate:[FormNotSavedGuard]},
      {path: 'experience', component: WorkExperienceComponent, canDeactivate:[FormNotSavedGuard]},
      {path: 'education', component: EducationComponent, canDeactivate:[FormNotSavedGuard]},
      {path: 'contact', component: ContactComponent, canDeactivate:[FormNotSavedGuard]},
      {path: 'skill', component: SkillComponent, canDeactivate:[FormNotSavedGuard]},
      {path: 'language', component: LanguageComponent, canDeactivate:[FormNotSavedGuard]},
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
