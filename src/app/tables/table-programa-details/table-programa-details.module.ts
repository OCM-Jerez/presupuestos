import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';

import { TableProgramaDetailsComponent } from './table-programa-details.component';

export const routes: Routes = [{ path: '', component: TableProgramaDetailsComponent }]

@NgModule({
  declarations: [TableProgramaDetailsComponent],
  imports: [RouterModule.forChild(routes), CommonModule, AgGridModule],
})
export class TableProgramaDetailsModule { }
