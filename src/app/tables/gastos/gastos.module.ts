import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';

import { GastosComponent } from './gastos.component';
import { ButtonClasificationComponent } from './components/button-clasification/button-clasification.component';
import { TableGastosComponent } from './components/table-gastos/table-gastos.component';

const routes: Routes = [{ path: '', component: GastosComponent }]
@NgModule({
  declarations: [
    GastosComponent,
    ButtonClasificationComponent,
    TableGastosComponent
  ],
  exports: [
    GastosComponent,
    ButtonClasificationComponent,
    TableGastosComponent
  ],

  imports: [
    CommonModule,
    AgGridModule,
    RouterModule.forChild(routes)
  ]
})
export class GastosModule { }
