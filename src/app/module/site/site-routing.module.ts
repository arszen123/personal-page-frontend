import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SiteComponent} from './site.component';
import {RegistrationComponent} from "./page/registration/registration.component";
import {LoginComponent} from "./page/login/login.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {
    path: 'app', children: [
      {path: '', component: SiteComponent}
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
