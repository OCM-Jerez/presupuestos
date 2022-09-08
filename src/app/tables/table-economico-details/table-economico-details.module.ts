import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';

import { TableEconomicoDetailsComponent } from './table-economico-details.component';

export const routes: Routes = [{ path: '', component: TableEconomicoDetailsComponent }]

@NgModule({
  declarations: [
    TableEconomicoDetailsComponent
  ],
  imports: [
    [RouterModule.forChild(routes), CommonModule, AgGridModule],
  ]
})
export class TableEconomicoDetailsModule { }
