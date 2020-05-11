import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PublicRoutingModule} from './public-routing.module';
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
import {WidgetModule} from "@app/module/widget/widget.module";


@NgModule({
  declarations: [ProfileComponent, NotFoundComponent, IndexComponent],
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
    WidgetModule
  ]
})
export class PublicModule {
}
