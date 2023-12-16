import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface IPerson {
	image: string;
	name: string;
	firstName: string;
	lastName: string;
	salary: string;
	'Ayto-URL': string;
	CV: string;
	assets: string;
	contact: string;
	'lindledin-URL': string;
}

interface IPosition {
	position: string;
	URL: string;
	salary: string;
	obs: string;
}

interface IRecord {
	date: string;
	name: string;
	firstName: string;
	lastName: string;
	salary: string;
	obs: string;
}

interface IData {
	id: number;
	position: string;
	type: string;
	'RPT-URL': string;
	obs: string;
	person: IPerson;
	positions: IPosition[];
	records: IRecord;
}

@Component({
	selector: 'app-pelayo',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './employeeRecod.component.html',
	styleUrls: ['./employeeRecod.component.scss']
})
export default class EmployeeRecodComponent implements OnInit {
	@Input() id?: number;
	public data: IData = null;
	public name = '';
	private _http = inject(HttpClient);

	ngOnInit(): void {
		this._http.get(`/assets/puestos/${this.id}.json`).subscribe(
			(data: IData) => {
				this.data = data;
				this.name = `${this.data.person.name} ${this.data.person.firstName} ${this.data.person.lastName}`;
				// console.log(this.data);
			},
			(error) => {
				console.error('Error al obtener los datos:', error);
			}
		);
	}
}
