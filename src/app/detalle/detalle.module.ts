import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';
import { HighchartsChartModule } from 'highcharts-angular';

import { CheckboxModule } from '../commons/components/checkbox/checkbox.module';
import { TableIngresosModule } from '../tables/table-ingresos/table-ingresos.module';
import { GastosModule } from '../tables/table/gastos.module';
import { TabsModule } from './components/tabs/tabs.module';
import { TreemapModule } from './components/treemap/treemap.module';

import { TablePresupuestoComponent } from './components/table-presupuesto/table-presupuesto.component';
import { DetalleComponent } from './detalle.component';

// export const routes: Routes = [{ path: '', component: DetalleComponent }];
@NgModule({
    declarations: [DetalleComponent, TablePresupuestoComponent],
    imports: [
        CommonModule,
        FormsModule,
        // RouterModule.forChild(routes),
        AgGridModule,
        HighchartsChartModule,
        CheckboxModule,
        GastosModule,
        TableIngresosModule,
        TabsModule,
        TreemapModule,
    ],
})
export class DetallePresupuestoModule {}
