import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import * as Highcharts from 'highcharts';
import HighchartsTreemap from 'highcharts/modules/treemap';
HighchartsTreemap(Highcharts);

import { ChangeSubTabService } from '../../../services/change-subtab.service';
import { DataStoreService } from '../../../services/dataStore.service';
import { PrepareDataTreemapService } from '../../../services/prepareDataTreemap.service';
import { SelectedTabNewService } from '../../../services/selectedTabNew.service';

import { IDataTreemap } from '../../../commons/interfaces/dataTreemap.interface';
import { SelectedSubTab1Service } from '../../../services/selectedSubTab1.service';
import { SelectedSubTab2Service } from '../../../services/selectedSubTab2.service';
import { SelectedSubTab4Service } from '../../../services/selectedSubTab4.service';

@Component({
    selector: 'app-treemap',
    templateUrl: './treemap.component.html',
    styleUrls: ['./treemap.component.scss'],
})
export class TreemapComponent implements OnInit {
    // private _dataTreeMap: IIngresos | IGastos;
    private _dataTreeMap: IDataTreemap;
    private _tabSelected: number;
    private _subTabSelectd: number;
    private _subTabSelectd1: string;
    private _subTabSelectd2: string;
    private _subTabSelectd4: string;
    private _codField: string;
    private _desField: string;
    private _fields = { codigo: '', descripcion: '' };
    private _unsubscribe$ = new Subject<void>();

    // En prepareDataGastos.service.ts de asinan los diferentes nives a los campos CodPro o CodEco
    // private tabMapping = {
    //     11: { code: 'CodCap', description: 'DesCap' },
    //     12: { code: 'CodArt', description: 'DesArt' },
    //     13: { code: 'CodCon', description: 'DesCon' },
    //     14: { code: 'CodEco', description: 'DesEco' },
    //     21: { code: 'CodPro', description: 'DesPro' },
    //     22: { code: 'CodPro', description: 'DesPro' },
    //     23: { code: 'CodPro', description: 'DesPro' },
    //     24: { code: 'CodPro', description: 'DesPro' },
    //     31: { code: 'CodOrg', description: 'DesOrg' },
    //     41: { code: 'CodEco', description: 'DesEco' },
    //     42: { code: 'CodEco', description: 'DesEco' },
    //     43: { code: 'CodEco', description: 'DesEco' },
    //     44: { code: 'CodEco', description: 'DesEco' },
    // };

    constructor(
        private _changeSubTabService: ChangeSubTabService,
        private _dataStoreService: DataStoreService,
        private _prepareDataTreemapService: PrepareDataTreemapService,
        private _selectedTabNewService: SelectedTabNewService,
        private _selectedSubTab1Service: SelectedSubTab1Service,
        private _selectedSubTab2Service: SelectedSubTab2Service,
        private _selectedSubTab4Service: SelectedSubTab4Service
    ) {}

    ngOnInit() {
        this._selectedTabNewService.source$
            .pipe(
                tap((data) => {
                    this._tabSelected = data;
                    console.log('Has cambiado de tab: ', data);
                    this.changeSubTabByTabSelected();
                })
            )
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe();

        this._changeSubTabService.source$
            .pipe(
                tap((data) => {
                    console.log('Has cambiado de subtab: ', data);
                    this._codField = data.codField;
                    this._desField = data.desField;
                    this.loadData(data.codField, data.desField);
                })
            )
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe();
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    private changeSubTabByTabSelected() {
        this._selectedSubTab1Service.source$.subscribe((data) => {
            this._subTabSelectd1 = data;
        });

        this._selectedSubTab2Service.source$.subscribe((data) => {
            this._subTabSelectd2 = data;
        });

        this._selectedSubTab4Service.source$.subscribe((data) => {
            this._subTabSelectd4 = data;
        });

        console.log('tabSelectd: ', this._tabSelected);
        console.log('subTabSelectd1: ', this._subTabSelectd1);
        console.log('subTabSelectd2: ', this._subTabSelectd2);
        console.log('subTabSelectd4: ', this._subTabSelectd4);

        switch (this._tabSelected) {
            case 1:
                switch (this._subTabSelectd1) {
                    case 'ingresosEconomicaCapitulos':
                        this._fields = { codigo: 'CodCap', descripcion: 'DesCap' };
                        // this._subTabSelectd = 11;
                        break;
                    case 'ingresosEconomicaArticulos':
                        this._fields = { codigo: 'CodArt', descripcion: 'DesArt' };
                        // this._subTabSelectd = 12;
                        break;
                    case 'ingresosEconomicaConceptos':
                        this._fields = { codigo: 'CodCon', descripcion: 'Descon' };
                        // this._subTabSelectd = 13;
                        break;
                    case 'ingresosEconomicaEconomicos':
                        this._fields = { codigo: 'CodEco', descripcion: 'DesEco' };
                        // this._subTabSelectd = 14;
                        break;
                    default:
                        break;
                }
                break;

            case 2:
                this._fields = { codigo: 'CodPro', descripcion: 'DesPro' };
                // switch (this._subTabSelectd2) {
                //     case 'Por áreas' || 'Por programas':
                //         // this._subTabSelectd = 21;
                //         this._fields = { codigo: 'CodPro', descripcion: 'DesPro' };
                //         break;
                //     case 'Por política':
                //         // this._subTabSelectd = 22;
                //         this._fields = { codigo: 'CodPro', descripcion: 'DesPro' };
                //         break;
                //     case 'Por grupo programas':
                //         // this._subTabSelectd = 23;
                //         this._fields = { codigo: 'CodPro', descripcion: 'DesPro' };
                //         break;
                //     // case 'Por programa':
                //     //     // this._subTabSelectd = 24;
                //     //     break;
                //     default:
                //         break;
                // }
                break;

            case 3:
                this._fields = { codigo: 'CodOrg', descripcion: 'DesOrg' };
                // this._subTabSelectd = 31;
                break;

            case 4:
                this._fields = { codigo: 'CodEco', descripcion: 'DesEco' };
                // switch (this._subTabSelectd4) {
                //     case 'Por capítulo gasto':
                //         this._subTabSelectd = 41;
                //         break;
                //     case 'Por artículo':
                //         this._subTabSelectd = 42;
                //         break;
                //     case 'Por concepto':
                //         this._subTabSelectd = 43;
                //         break;
                //     case 'Por económico':
                //         this._subTabSelectd = 44;
                //         break;
                //     default:
                //         break;
                // }
                break;
            default:
                break;
        }

        this._changeSubTabService.changeSubTab(this._fields.codigo, this._fields.descripcion);
        console.log('this._fields: ', this._fields);
        // this.loadData(this._fields.codigo, this._fields.descripcion);

        // const tabInfo = this.tabMapping[this._subTabSelectd];
        // if (tabInfo) {
        //     this._changeSubTabService.changeSubTab(tabInfo.code, tabInfo.description);
        //     console.log('tabInfo: ', tabInfo);

        //     // this.loadData(tabInfo.code, tabInfo.description);
        // }
    }

    loadData(codField: string, desField: string) {
        console.log('codField: ', codField, 'desField: ', desField);

        const loadData = this._dataStoreService.dataTable;
        this._dataTreeMap = this.dataTreemap(
            this._tabSelected === 1 ? loadData.rowDataIngresos : loadData.rowDataGastos,
            codField,
            desField
        );
        console.log('this._dataTreeMap: ', this._dataTreeMap);

        this.showTreemap();
    }

    dataTreemap(data: any, codField: string, desField: string) {
        return this._prepareDataTreemapService.calcSeries(data, codField, desField, 'Definitivas2023');
    }

    showTreemap() {
        const data: IDataTreemap = this._dataTreeMap;
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
                enabled: true,
                headerFormat: `<span class="mb-2">{point.key}</span>`,
                pointFormat: `<span class="mb-2">{point.key}</span>`,
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
