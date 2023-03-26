import { Component } from '@angular/core';

import { TableService } from '../services/table.service';

import { CLASIFICATION_TYPE } from '../commons/util/util';
import { PrepareDataTreemapService } from '../services/prepareDataTreemap.service';

@Component({
    selector: 'app-detalle-presupuesto',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent {
    constructor(
        private _tableService: TableService,
        private _prepareDataTreemapService: PrepareDataTreemapService
    ) {}

    private _typeClasification: CLASIFICATION_TYPE;
    dataTreeMap: any;

    async hasChangeCheckbox() {
        let data = await this._tableService.loadData(this._typeClasification);
    }

    selectedIndex = 1;

    async selectedTab(idTab: number) {
        this.selectedIndex = idTab;

        const typeClasification = this.getTypeClasification(idTab);
        const loadData = await this._tableService.loadData(typeClasification);

        if (idTab === 1) {
            this.dataTreeMap = await this.dataTreemap(
                idTab,
                loadData.rowDataIngresos
            );
        } else {
            this.dataTreeMap = await this.dataTreemap(
                idTab,
                loadData.rowDataGastos
            );
        }
    }

    getTypeClasification(idTab: number): CLASIFICATION_TYPE {
        switch (idTab) {
            case 1:
                return 'ingresosEconomicaEconomicos';
            case 2:
                return 'gastosProgramaPoliticas';
            // case 3:
            //     return 'organico';
            // case 4:
            //     return 'economica';
        }
        return 'ingresosEconomicaEconomicos';
    }

    async dataTreemap(idTab: number, data: any) {
        // Datos para grafico
        switch (idTab) {
            case 1:
                return await this._prepareDataTreemapService.calcSeries(
                    data,
                    'CodEco',
                    'DesEco',
                    'Definitivas2023'
                );
            case 2:
                return await this._prepareDataTreemapService.calcSeries(
                    data,
                    'CodPro',
                    'DesPro',
                    'Definitivas2023'
                );
            case 3:
                return await this._prepareDataTreemapService.calcSeries(
                    data,
                    'CodOrg',
                    'DesOrg',
                    'Definitivas2023'
                );
            case 4:
                return await this._prepareDataTreemapService.calcSeries(
                    data,
                    'CodCap',
                    'DesCap',
                    'Definitivas2023'
                );
        }
    }
}

// case 'tab1':
//     this._typeClasification = 'ingresosEconomicaEconomicos';
//     break;
// case 'tab2':
//     this._typeClasification = '';
//     break;
// case 'tab3':
//     this._typeClasification = 'gastosOrganicaOrganicos';
//     break;
// case 'tab4':
//     this._typeClasification = 'gastosEconomicaConceptos';
//     break;
