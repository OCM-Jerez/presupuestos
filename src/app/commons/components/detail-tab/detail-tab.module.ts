import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { HighchartsChartModule } from 'highcharts-angular';
import { TabsModule } from '../../../detalle/components/tabs/tabs.module';
import { DetailTabComponent } from './detail-tab.component';

@NgModule({
    declarations: [DetailTabComponent],
    imports: [CommonModule, TabsModule, AgGridModule, HighchartsChartModule],
    exports: [DetailTabComponent],
})
export class DetailTabModule {}
