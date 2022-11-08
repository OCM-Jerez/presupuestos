import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GastosComponent } from './gastos.component';
import { ButtonClasificationComponent } from './components/button-clasification/button-clasification.component';
import { TableGastosComponent } from './components/table-gastos/table-gastos.component';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';

import { Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: GastosComponent }]


@NgModule({
  declarations: [
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
