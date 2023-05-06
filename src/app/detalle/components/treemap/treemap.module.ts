import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { HighchartsChartModule } from 'highcharts-angular';
import { TabsModule } from '../tabs/tabs.module';
import { TreemapComponent } from './treemap.component';

@NgModule({
    imports: [CommonModule, TabsModule, AgGridModule, HighchartsChartModule, TreemapComponent],
    exports: [TreemapComponent],
})
export class TreemapModule {}
