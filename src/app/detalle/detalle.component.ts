import { Component } from '@angular/core';
import { CLASIFICATION_TYPE } from '../commons/util/util';
import { PrepareDataTreemapService } from '../services/prepareDataTreemap.service';
import { TableService } from '../services/table.service';

@Component({
    selector: 'app-detalle-presupuesto',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent {
    dataTreeMap: any;
    idTab: number;
    private _typeClasification: CLASIFICATION_TYPE;
    private readonly _tabMappings: { [id: number]: { code: string; desc: string } } = {
        1: { code: 'CodEco', desc: 'DesEco' },
        2: { code: 'CodPro', desc: 'DesPro' },
        3: { code: 'CodOrg', desc: 'DesOrg' },
        4: { code: 'CodCap', desc: 'DesCap' },
    };

    constructor(private _prepareDataTreemapService: PrepareDataTreemapService, private _tableService: TableService) {}

    async hasChangeCheckbox() {
        let data = await this._tableService.loadData(this._typeClasification);
    }

    async selectedTab(idTab: number) {
        this.idTab = idTab;
        const typeClasification = this.getTypeClasification(idTab);
        const loadData = await this._tableService.loadData(typeClasification);
        if (idTab === 1) {
            this.dataTreeMap = await this.dataTreemap(idTab, loadData.rowDataIngresos);
        } else {
            this.dataTreeMap = await this.dataTreemap(idTab, loadData.rowDataGastos);
        }
    }

    // Determina el tipo de clasificación que se mostrar primero al cambiar de tab
    getTypeClasification(idTab: number): CLASIFICATION_TYPE {
        const classificationTypes: {
            [key: number]: CLASIFICATION_TYPE;
        } = {
            1: 'ingresosEconomicaEconomicos',
            2: 'gastosProgramaPoliticas',
            3: 'gastosOrganicaOrganicos',
            4: 'gastosEconomicaEconomicos',
        };
        return classificationTypes[idTab];
    }

    async dataTreemap(idTab: number, data: any) {
        console.log('idTab', idTab);

        const { code, desc } = this._tabMappings[idTab];
        return this._prepareDataTreemapService.calcSeries(data, code, desc, 'Definitivas2023');
    }
}
