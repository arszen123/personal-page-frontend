import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WidgetComponent} from "@app/component/widget/widget.component";
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule, MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from "@angular/material";

@NgModule({
  declarations: [WidgetComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
  ],
  exports: [
    WidgetComponent
  ]
})
export class WidgetModule { }
