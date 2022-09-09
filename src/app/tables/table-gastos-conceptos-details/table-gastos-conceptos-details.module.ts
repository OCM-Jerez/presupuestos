import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';

import { TableGastosConceptosDetailsComponent } from './table-gastos-conceptos-details.component';

export const routes: Routes = [{ path: '', component: TableGastosConceptosDetailsComponent }]

@NgModule({
  declarations: [
    TableGastosConceptosDetailsComponent
  ],
  imports: [
    [RouterModule.forChild(routes), CommonModule, AgGridModule],
  ]
})
export class TableGastosConceptosDetailsModule { }
