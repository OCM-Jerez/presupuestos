import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from './supabase.service';

@Component({
	selector: 'app-supabase',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './supabase.component.html',
	styleUrls: ['./supabase.component.scss']
})
export default class SupabaseComponent implements OnInit {
	s;
	@Input() id?: number;
	public employeeData: any[] = null;
	public positionData: any[] = null;
	public positionExternalData: any[] = null;
	public positionExternalData11: any[] = null;
	public recordData: any[] = null;

	public employeeName: string = null;
	public hasEmployeeLinkedin = false;
	public hasEmployeeWikipedia = false;
	public hasPositionExternal = false;
	public hasPositionExternal11 = false;

	public hasRecord = false;
	public hasRecordLinkedin = false;

	constructor(private supabaseService: SupabaseService) {}

	ngOnInit(): void {
		this.fetchData();
		// console.log(this.id);
		// this.useGraphQL();
	}

	async fetchData() {
		try {
			this.positionData = await this.supabaseService.fetchTableData('positions', this.id);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			this.employeeData = await this.supabaseService.fetchTableData('employees', this.id);
			if (this.employeeData[0].linkedin_url) this.hasEmployeeLinkedin = true;
			if (this.employeeData[0].wikipedia_url) this.hasEmployeeWikipedia = true;
			this.employeeName = `${this.employeeData[0].name} ${this.employeeData[0].firstname} ${this.employeeData[0].lastname}`;
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			this.positionExternalData = await this.supabaseService.fetchTableData('positions_external', this.id);
			console.log(this.positionExternalData);

			if (this.positionExternalData[0].position !== null) this.hasPositionExternal = true;
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			this.positionExternalData11 = await this.supabaseService.fetchTableData('positions_external', 11);
			console.log(this.positionExternalData11);

			if (this.positionExternalData11[0].position !== null) this.hasPositionExternal11 = true;
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			this.recordData = await this.supabaseService.fetchTableData('records', this.id);
			if (this.recordData[0].name !== null) this.hasRecord = true;
			if (this.recordData[0].linkedin_url) this.hasRecordLinkedin = true;
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	async useGraphQL() {
		const data = await this.supabaseService.fetchQuery('employees', this.id);
		console.log(data);

		const jsonData = {
			data: {
				employeesCollection: {
					edges: [
						{
							node: {
								id: 1,
								name: 'María José',
								salary: 'Ayuntamiento = 74.135,35 Senado= 28.658,14 Total= 102.793,49  ',
								ayto_url:
									'https://transparencia.jerez.es/infopublica/institucional/corporacion/2023-2027/maria-jose-garcia-pelayo',
								lastname: 'Pelayo',
								firstname: 'García'
							}
						}
					]
				},
				positionsCollection: {
					edges: [
						{
							node: {
								id: 1,
								position: 'Alcaldía-Presidencia'
							}
						}
					]
				}
			}
		};

		const idValue = jsonData.data.employeesCollection.edges[0].node.name;
		console.log(idValue); // Esto mostrará 101
	}
}
