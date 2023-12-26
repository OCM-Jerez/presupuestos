import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-data-general',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './data-general.component.html',
	styleUrls: ['./data-general.component.scss']
})
export default class DataGeneralComponent {
	// TODO: - Add types
	@Input() data: any[];

	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}
}
