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
	@Input() data: any[]; // Asegúrate de usar un tipo más específico que 'any' si es posible

	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}
}
