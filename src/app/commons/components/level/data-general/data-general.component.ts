import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-data-general',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './data-general.component.html',
	styleUrls: ['./data-general.component.scss']
})
export default class DataGeneralComponent implements OnInit {
	// TODO: - Add types
	@Input() data: any[];

	ngOnInit(): void {
		console.log('data: ', this.data);

		// setTimeout(() => {
		// 	console.log('data[0]: ', this.data[0].expediente);
		// 	this.data = Object.entries(this.data);
		// 	console.log('data: ', this.data[0][1]['expediente']);
		// }, 1000);
	}

	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}
}
