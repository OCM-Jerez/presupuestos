import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';
import { HighchartsChartModule } from 'highcharts-angular';

import { DetalleComponent } from './detalle.component';
import { TableIngresosModule } from '../tables/table-ingresos/table-ingresos.module';
import { CheckboxModule } from '../commons/components/checkbox/checkbox.module';
import { GastosModule } from '../tables/gastos/gastos.module';
// import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { TablePresupuestoComponent } from './components/table-presupuesto/table-presupuesto.component';
import { ClasificationTabsComponent } from './components/clasification-tabs/clasification-tabs.component';
import { BarClasificationTabsComponent } from './components/clasification-tabs/components/bar-clasification-tabs/bar-clasification-tabs.component';

export const routes: Routes = [{ path: '', component: DetalleComponent }]
@NgModule({
  declarations: [
    DetalleComponent,
    TablePresupuestoComponent,
    ClasificationTabsComponent,
    BarClasificationTabsComponent
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
    // NgSelectModule
  ],
})
export class DetallePresupuestoModule { }
