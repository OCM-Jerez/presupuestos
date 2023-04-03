import {
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter,
    Output,
    QueryList,
} from '@angular/core';

import { TabComponent } from './tab/tab.component';

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

    ngAfterContentInit(): void {
        // console.log(this.tabs);
        const activeTabs = this.tabs.filter((tab) => tab.active);

        if (activeTabs.length === 0) {
            this.tabs.first.active = true;
            this.selectedTab.emit(this.tabs.first.idTab);
        }
    }

    selectTab(tab: TabComponent): void {
        const tabs = this.tabs.toArray();
        // console.log(tabs);
        const tabActive = tabs.find((tab) => tab.active);

        if (tabActive && tabActive.idTab !== tab.idTab) {
            this.tabs.toArray().forEach((tab) => (tab.active = false));
            tab.active = true;

            this.selectedTab.emit(tab.idTab);
            // this.selectedTab.subscribe((data) => {
            //     console.log('Contenido del evento:', data);
            // });
        }
    }
}
