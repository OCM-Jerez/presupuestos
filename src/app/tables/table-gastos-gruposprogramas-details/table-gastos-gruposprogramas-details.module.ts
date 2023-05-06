import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';

import { TableGastosGruposprogramasDetailsComponent } from './table-gastos-gruposprogramas-details.component';

export const routes: Routes = [{ path: '', component: TableGastosGruposprogramasDetailsComponent }]

@NgModule({
    imports: [
        [RouterModule.forChild(routes), CommonModule, AgGridModule],
        TableGastosGruposprogramasDetailsComponent,
    ]
})
export class TableGastosGruposprogramasDetailsModule { }
