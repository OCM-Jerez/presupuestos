import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';

import { TableGastosAplicacionPresupuestariaComponent } from './table-gastos-aplicacion-presupuestaria.component';

export const routes: Routes = [{ path: '', component: TableGastosAplicacionPresupuestariaComponent }]

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, AgGridModule, TableGastosAplicacionPresupuestariaComponent],
})
export class TableGastosAplicacionPresupuestariaModule { }
