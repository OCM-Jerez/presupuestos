import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TYPE_TAB } from '../../../../../commons/types/tabs.type';

@Component({
    selector: 'app-bar-clasification-tabs',
    templateUrl: './bar-clasification-tabs.component.html',
    styleUrls: ['./bar-clasification-tabs.component.scss'],
})
export class BarClasificationTabsComponent {
    @Input() showIngresos = false;
    @Input() showPrograma = false;
    @Input() showOrganico = false;
    @Input() showEconomica = false;

    @Output() checkedTab = new EventEmitter<TYPE_TAB>();

    checkedTabEvent(tabSelected: TYPE_TAB) {
        this.checkedTab.emit(tabSelected);
    }
}
