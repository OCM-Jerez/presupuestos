import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetallePresupuestoComponent } from './detalle-presupuesto.component';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule, Routes } from '@angular/router';
import { TableIngresosModule } from '../tables/table-ingresos/table-ingresos.module';
import { PruebaModule } from '../hightcharts/prueba/prueba.module';
import { HighchartsChartModule } from 'highcharts-angular';

export const routes: Routes = [{ path: '', component: DetallePresupuestoComponent }]

@NgModule({
  declarations: [
    DetallePresupuestoComponent
  ],
  imports: [RouterModule.forChild(routes), CommonModule, AgGridModule, TableIngresosModule, HighchartsChartModule],
})
export class DetallePresupuestoModule { }
