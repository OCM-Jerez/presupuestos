import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';

import { TableGastosComponent } from './table-gastos.component';

export const routes: Routes = [{ path: '', component: TableGastosComponent }]

@NgModule({
    declarations: [TableGastosComponent],
    imports: [RouterModule.forChild(routes), CommonModule, AgGridModule],
})
export class TableGastosModule { }
