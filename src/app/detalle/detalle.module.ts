import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';
import { HighchartsChartModule } from 'highcharts-angular';

import { FormsModule } from '@angular/forms';
import { CheckboxModule } from '../commons/components/checkbox/checkbox.module';
import { GastosModule } from '../tables/gastos/gastos.module';
import { TableIngresosModule } from '../tables/table-ingresos/table-ingresos.module';
import { ClasificationTabsComponent } from './components/clasification-tabs/clasification-tabs.component';
import { BarClasificationTabsComponent } from './components/clasification-tabs/components/bar-clasification-tabs/bar-clasification-tabs.component';
import { DetailTabModule } from './components/detail-tab/detail-tab.module';
import { TablePresupuestoComponent } from './components/table-presupuesto/table-presupuesto.component';
import { TabsModule } from './components/tabs/tabs.module';
import { DetalleComponent } from './detalle.component';

export const routes: Routes = [{ path: '', component: DetalleComponent }];
@NgModule({
    declarations: [
        DetalleComponent,
        TablePresupuestoComponent,
        ClasificationTabsComponent,
        BarClasificationTabsComponent,
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
        TabsModule,
        DetailTabModule,
    ],
})
export class DetallePresupuestoModule {}
