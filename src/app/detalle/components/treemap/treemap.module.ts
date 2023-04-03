import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { HighchartsChartModule } from 'highcharts-angular';
import { TabsModule } from '../tabs/tabs.module';
import { TreemapComponent } from './treemap.component';

@NgModule({
    declarations: [TreemapComponent],
    imports: [CommonModule, TabsModule, AgGridModule, HighchartsChartModule],
    exports: [TreemapComponent],
})
export class TreemapModule {}
