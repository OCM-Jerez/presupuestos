import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';
import { HighchartsChartModule } from 'highcharts-angular';


import { TableIngresosModule } from '../tables/table-ingresos/table-ingresos.module';



import { SubtabsComponent } from './components/subtabs/subtabs.component';
import { TablePresupuestoComponent } from './components/table-presupuesto/table-presupuesto.component';
import { TableComponent } from './components/table/table.component';
import { DetalleComponent } from './detalle.component';

export const routes: Routes = [{ path: '', component: DetalleComponent }];
@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    AgGridModule,
    HighchartsChartModule,
    TableIngresosModule,
    DetalleComponent, SubtabsComponent, TablePresupuestoComponent, TableComponent,
],
})
export class DetalleModule {}
