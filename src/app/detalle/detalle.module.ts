import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';
import { HighchartsChartModule } from 'highcharts-angular';

import { DetalleComponent } from './detalle.component';
import { TableIngresosModule } from '../tables/table-ingresos/table-ingresos.module';
import { CheckboxModule } from '../commons/components/checkbox/checkbox.module';
import { GastosModule } from '../tables/gastos/gastos.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';

export const routes: Routes = [{ path: '', component: DetalleComponent }]
@NgModule({
  declarations: [
    DetalleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgGridModule,
    HighchartsChartModule,
    TableIngresosModule,
    CheckboxModule,
    GastosModule,
    FormsModule,
    NgSelectModule
  ],
})
export class DetallePresupuestoModule { }
