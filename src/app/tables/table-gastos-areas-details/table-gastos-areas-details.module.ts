import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';

import { TableGastosAreasDetailsComponent } from './table-gastos-areas-details.component';

export const routes: Routes = [{ path: '', component: TableGastosAreasDetailsComponent }]

@NgModule({
  declarations: [
    TableGastosAreasDetailsComponent
  ],
  imports: [
    [RouterModule.forChild(routes), CommonModule, AgGridModule],
  ]
})
export class TableGastosAreasDetailsModule { }
