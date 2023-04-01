import { Component } from '@angular/core';

import { PrepareDataTreemapService } from '../services/prepareDataTreemap.service';
import { TableService } from '../services/table.service';

import { CLASIFICATION_TYPE } from '../commons/util/util';

@Component({
    selector: 'app-detalle-presupuesto',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent {
    constructor(
        private _prepareDataTreemapService: PrepareDataTreemapService,
        private _tableService: TableService
    ) {}

    private _typeClasification: CLASIFICATION_TYPE;
    dataTreeMap: any;

    async hasChangeCheckbox() {
        let data = await this._tableService.loadData(this._typeClasification);
    }

    // selectedIndex = 1;

    async selectedTab(idTab: number) {
        // this.selectedIndex = idTab;
        const typeClasification = this.getTypeClasification(idTab);
        const loadData = await this._tableService.loadData(typeClasification);

        if (idTab === 1) {
            this.dataTreeMap = await this.dataTreemap(idTab, loadData.rowDataIngresos);
        } else {
            this.dataTreeMap = await this.dataTreemap(idTab, loadData.rowDataGastos);
        }
    }

    getTypeClasification(idTab: number): CLASIFICATION_TYPE {
        const classificationTypes: {
            [key: number]: CLASIFICATION_TYPE;
        } = {
            1: 'ingresosEconomicaEconomicos',
            2: 'gastosProgramaPoliticas',
            3: 'gastosOrganicaOrganicos',
            4: 'gastosEconomicaConceptos',
        };
        return classificationTypes[idTab];
    }

    private readonly _tabMappings: { [id: number]: { code: string; desc: string } } = {
        1: { code: 'CodEco', desc: 'DesEco' },
        2: { code: 'CodPro', desc: 'DesPro' },
        3: { code: 'CodOrg', desc: 'DesOrg' },
        4: { code: 'CodCap', desc: 'DesCap' },
    };

    async dataTreemap(idTab: number, data: any) {
        const { code, desc } = this._tabMappings[idTab];
        return this._prepareDataTreemapService.calcSeries(data, code, desc, 'Definitivas2023');
    }

    // getTypeClasification(idTab: number): CLASIFICATION_TYPE {
    //     switch (idTab) {
    //         case 1:
    //             return 'ingresosEconomicaEconomicos';
    //         case 2:
    //             return 'gastosProgramaPoliticas';
    //         case 3:
    //             return 'gastosOrganicaOrganicos';
    //         case 4:
    //             return 'gastosEconomicaConceptos';
    //     }
    //     return 'ingresosEconomicaEconomicos';
    // }

    // async dataTreemap(idTab: number, data: any) {
    //     // Datos para grafico
    //     switch (idTab) {
    //         case 1:
    //             return await this._prepareDataTreemapService.calcSeries(
    //                 data,
    //                 'CodEco',
    //                 'DesEco',
    //                 'Definitivas2023'
    //             );
    //         case 2:
    //             return await this._prepareDataTreemapService.calcSeries(
    //                 data,
    //                 'CodPro',
    //                 'DesPro',
    //                 'Definitivas2023'
    //             );
    //         case 3:
    //             return await this._prepareDataTreemapService.calcSeries(
    //                 data,
    //                 'CodOrg',
    //                 'DesOrg',
    //                 'Definitivas2023'
    //             );
    //         case 4:
    //             return await this._prepareDataTreemapService.calcSeries(
    //                 data,
    //                 'CodCap',
    //                 'DesCap',
    //                 'Definitivas2023'
    //             );
    //     }
    // }
}
