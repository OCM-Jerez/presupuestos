import { Component, Input, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
    selector: 'app-detail-tab',
    templateUrl: './detail-tab.component.html',
    styleUrls: ['./detail-tab.component.scss'],
})
export class DetailTabComponent implements OnChanges {
    @Input() dataTreeMap: any;

    ngOnChanges(): void {
        if (this.dataTreeMap) {
            setTimeout(() => {
                this.showTreemap();
            }, 0);
        }
    }

    showTreemap() {
        const data = this.dataTreeMap;
        Highcharts.chart('treemap', {
            accessibility: {
                enabled: false,
            },
            chart: {
                type: 'treemap',
            },
            title: {
                text: '',
            },
            credits: {
                enabled: false,
            },
            legend: {
                enabled: false,
            },
            tooltip: {
                tooltip: {
                    enabled: false,
                },
                headerFormat: `<span class="mb-2">{point.key}</span><br>`,
                // pointFormat: '<span>Euros: {point.value}</span></br><span>Color: {point.colorValue}</span>',
                pointFormat: '<span>Euros: {point.value}</span>',
                useHTML: true,
            },
            series: [
                {
                    name: null,
                    innerSize: '50%',
                    data: data,
                },
            ],
        } as any);
    }
}
