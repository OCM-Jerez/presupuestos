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
    @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
    @Output() selectedTab = new EventEmitter();

    ngAfterContentInit(): void {
        const activeTabs = this.tabs.filter((tab) => tab.active);

        if (activeTabs.length === 0) {
            this.tabs.first.active = true;
            this.selectedTab.emit(this.tabs.first.idTab);
        }
    }

    selectTab(tab: TabComponent): void {
        const tabs = this.tabs.toArray();
        const tabActive = tabs.find((tab) => tab.active);

        if (tabActive && tabActive.idTab !== tab.idTab) {
            this.tabs.toArray().forEach((tab) => (tab.active = false));
            tab.active = true;
            this.selectedTab.emit(tab.idTab);
        }
    }
}
