import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';
import { HighchartsChartModule } from 'highcharts-angular';

import { CheckboxModule } from '../commons/components/checkbox/checkbox.module';
import { TableIngresosModule } from '../tables/table-ingresos/table-ingresos.module';
import { TabsModule } from './components/tabs/tabs.module';
import { TreemapModule } from './components/treemap/treemap.module';

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
        CheckboxModule,
        TableIngresosModule,
        TabsModule,
        TreemapModule,
        DetalleComponent, SubtabsComponent, TablePresupuestoComponent, TableComponent,
    ],
})
export class DetalleModule {}
