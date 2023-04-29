import { AfterContentInit, Component, ContentChildren, EventEmitter, Output, QueryList } from '@angular/core';

import { TabComponent } from './tab/tab.component';

import { SelectedTabService } from '../../../services/selectedTab.service';
import { TableService } from '../../../services/table.service';

import { IDataTable } from '../../../commons/interfaces/dataTable.interface';
import { CLASIFICATION_TYPE } from '../../../commons/util/util';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements AfterContentInit {
    // El operador de aserción de no nulo ! se utiliza para asegurar
    // que la variable tabs no será nula en tiempo de ejecución.
    @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
    @Output() selectedTab = new EventEmitter();
    public dataTable: IDataTable;

    constructor(private _tableService: TableService, private _selectedTabService: SelectedTabService) {}

    ngAfterContentInit(): void {
        const activeTabs = this.tabs.filter((tab) => tab.active);

        if (activeTabs.length === 0) {
            this.tabs.first.active = true;
            this.selectedTab.emit(this.tabs.first.idTab);
        }
    }

    async clickTab(tab: TabComponent): Promise<void> {
        const tabs = this.tabs.toArray();
        const tabActive = tabs.find((tab) => tab.active);

        if (tabActive && tabActive.idTab !== tab.idTab) {
            this.tabs.toArray().forEach((tab) => (tab.active = false));
            tab.active = true;
            this.selectedTab.emit(tab.idTab);
        }

        const tabDataMap = {
            1: 'ingresosEconomicaEconomicos',
            2: 'gastosProgramaProgramas',
            3: 'gastosOrganicaOrganicos',
            4: 'gastosEconomicaEconomicos',
        };

        const clasificationType: CLASIFICATION_TYPE = tabDataMap[tab.idTab];
        this.dataTable = await this._tableService.loadData(clasificationType);
        // Guardar el tab seleccionado
        this._selectedTabService.setSelectedTabNew(tab.idTab);
    }
}
