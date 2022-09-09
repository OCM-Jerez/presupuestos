import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { AgGridModule } from 'ag-grid-angular';
import { TableGastosArticulosDetailsComponent } from './table-gastos-articulos-details.component';

export const routes: Routes = [{ path: '', component: TableGastosArticulosDetailsComponent }]

@NgModule({
  declarations: [
    TableGastosArticulosDetailsComponent
  ],
  imports: [
    [RouterModule.forChild(routes), CommonModule, AgGridModule],
  ]
})
export class TableGastosArticulosDetailsModule { }
