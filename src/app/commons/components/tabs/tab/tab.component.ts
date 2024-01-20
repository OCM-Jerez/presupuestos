import { Component, Input } from '@angular/core';


import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';

@Component({
	selector: 'app-tab',
	templateUrl: './tab.component.html',
	standalone: true,
	imports: []
})
export class TabComponent {
	@Input() clasification: CLASIFICATION_TYPE;
	@Input() title: string;
	@Input() active = false;
	@Input() isFicha: boolean;
}
