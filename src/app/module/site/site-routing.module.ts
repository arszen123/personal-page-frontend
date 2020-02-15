import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SiteComponent} from './site.component';
import {AuthLayoutComponent} from "./page/auth/auth-layout/auth-layout.component";
import {NotAuthGuard} from "@app/guard/not-auth.guard";
import {AuthGuard} from "@app/guard/auth.guard";
import {PersonalDataComponent} from "@app/module/site/page/app/profile/personal-data/personal-data.component";


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
      {path: 'personal-data', component: PersonalDataComponent}
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
