import { Component, OnInit } from '@angular/core';
import { IDataTable } from '../commons/interfaces/dataTable.interface';
import { CLASIFICATION_TYPE } from '../commons/util/util';
import { TableService } from '../services/table.service';

@Component({
    selector: 'app-detalle-presupuesto',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
    public dataTable: IDataTable;
    constructor(private _tableService: TableService) {}

    async ngOnInit(): Promise<void> {
        this.dataTable = await this._tableService.loadData('ingresosEconomicaEconomicos');
    }

    async hasChangeCheckbox() {
        // await this._tableService.loadData(this._typeClasification);
    }

    async clickTab(idTab: number) {
        // this._selectedTabService.setSelectedTabNew(idTab);
        // switch (idTab) {
        //     case 1:
        //         this.dataTable = await this._tableService.loadData('ingresosEconomicaEconomicos');
        //         break;
        //     case 2:
        //         this.dataTable = await this._tableService.loadData('gastosProgramaProgramas');
        //         break;
        //     case 3:
        //         this.dataTable = await this._tableService.loadData('gastosOrganicaOrganicos');
        //         break;
        //     case 4:
        //         this.dataTable = await this._tableService.loadData('gastosEconomicaEconomicos');
        //         break;
        // }

        const tabDataMap = {
            1: 'ingresosEconomicaEconomicos',
            2: 'gastosProgramaProgramas',
            3: 'gastosOrganicaOrganicos',
            4: 'gastosEconomicaEconomicos',
        };

        const clasificationType: CLASIFICATION_TYPE = tabDataMap[idTab];
        this.dataTable = await this._tableService.loadData(clasificationType);
    }

    clickSubTab(dataTable: IDataTable): void {
        this.dataTable = { ...dataTable };
    }
}
