import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';

import { TableGastosOrganicosDetailsComponent } from './table-gastos-organicos-details.component';

export const routes: Routes = [{ path: '', component: TableGastosOrganicosDetailsComponent }]

@NgModule({
  declarations: [
    TableGastosOrganicosDetailsComponent
  ],
  imports: [
    [RouterModule.forChild(routes), CommonModule, AgGridModule],
  ]
})
export class TableGastosOrganicosDetailsModule { }
