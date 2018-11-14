import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatButtonModule, MatTableModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class AppMaterialModule { }
