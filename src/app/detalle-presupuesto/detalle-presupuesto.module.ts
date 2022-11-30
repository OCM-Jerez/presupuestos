import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';
import { HighchartsChartModule } from 'highcharts-angular';

import { DetallePresupuestoComponent } from './detalle-presupuesto.component';
import { TableIngresosModule } from '../tables/table-ingresos/table-ingresos.module';
import { CheckboxModule } from '../commons/components/checkbox/checkbox.module';
import { GastosModule } from '../tables/gastos/gastos.module';

export const routes: Routes = [{ path: '', component: DetallePresupuestoComponent }]
@NgModule({
  declarations: [
    DetallePresupuestoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgGridModule,
    HighchartsChartModule,
    TableIngresosModule,
    CheckboxModule,
    GastosModule
  ],
})
export class DetallePresupuestoModule { }
