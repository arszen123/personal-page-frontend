import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from "@app/module/public/page/profile/profile.component";
import {IndexComponent} from "@app/module/public/page/index/index.component";


const routes: Routes = [
  {path: 'profile/:id', component: ProfileComponent},
  {path: '', component: IndexComponent},
  // {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
