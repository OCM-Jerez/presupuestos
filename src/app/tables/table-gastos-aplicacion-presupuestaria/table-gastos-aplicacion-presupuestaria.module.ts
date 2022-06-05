import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';

import { TableGastosAplicacionPresupuestariaComponent } from './table-gastos-aplicacion-presupuestaria.component';

export const routes: Routes = [{ path: '', component: TableGastosAplicacionPresupuestariaComponent }]

@NgModule({
  declarations: [TableGastosAplicacionPresupuestariaComponent],
  imports: [RouterModule.forChild(routes), CommonModule, AgGridModule],
})
export class TableGastosAplicacionPresupuestariaModule { }
