import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';

import { TableIngresosComponent } from './table-ingresos.component';

export const routes: Routes = [{ path: '', component: TableIngresosComponent }]

@NgModule({
    declarations: [TableIngresosComponent],
    imports: [RouterModule.forChild(routes), CommonModule, AgGridModule],
})
export class TableIngresosModule { }
