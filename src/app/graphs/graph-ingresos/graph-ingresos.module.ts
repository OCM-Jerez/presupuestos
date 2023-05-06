import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';
import { AgChartsAngularModule } from 'ag-charts-angular';

import { GraphIngresosComponent } from './graph-ingresos.component';

export const routes: Routes = [{ path: '', component: GraphIngresosComponent }]
@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, AgGridModule, AgChartsAngularModule, GraphIngresosComponent],
})
export class GraphIngresosModule { }
