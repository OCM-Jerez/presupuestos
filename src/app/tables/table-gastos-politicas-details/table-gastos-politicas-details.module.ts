import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';

import { TableGastosPoliticasDetailsComponent } from './table-gastos-politicas-details.component';

export const routes: Routes = [{ path: '', component: TableGastosPoliticasDetailsComponent }]

@NgModule({
  declarations: [
    TableGastosPoliticasDetailsComponent
  ],
  imports: [
    [RouterModule.forChild(routes), CommonModule, AgGridModule],
  ]
})
export class TableGastosPoliticasDetailsModule { }
