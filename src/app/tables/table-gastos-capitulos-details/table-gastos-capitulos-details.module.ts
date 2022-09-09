import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';

import { TableGastosCapitulosDetailsComponent } from './table-gastos-capitulos-details.component';

export const routes: Routes = [{ path: '', component: TableGastosCapitulosDetailsComponent }]

@NgModule({
  declarations: [
    TableGastosCapitulosDetailsComponent
  ],
  imports: [
    [RouterModule.forChild(routes), CommonModule, AgGridModule],
  ]
})
export class TableGastosCapitulosDetailsModule { }
