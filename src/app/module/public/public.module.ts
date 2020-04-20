import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PublicRoutingModule} from './public-routing.module';
import {PublicComponent} from './public.component';
import {ProfileComponent} from './page/profile/profile.component';
import {NotFoundComponent} from './page/not-found/not-found.component';
import {IndexComponent} from './page/index/index.component';
import {GridstackModule} from "@libria/gridstack";
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule, MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from "@angular/material";
import {WidgetComponent} from "@app/component/widget/widget.component";


@NgModule({
  declarations: [PublicComponent, ProfileComponent, NotFoundComponent, IndexComponent, WidgetComponent],
  exports: [
    WidgetComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    GridstackModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
  ]
})
export class PublicModule {
}
