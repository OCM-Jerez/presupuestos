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
	public recordData: any[] = null;

	public employeeName: string = null;
	public hasEmployeeLinkedin = false;
	public hasRecordLinkedin = false;

	constructor(private supabaseService: SupabaseService) {}

	ngOnInit(): void {
		this.fetchData();
		console.log(this.id);
		this.useGraphQL();
	}

	async fetchData() {
		try {
			const data = await this.supabaseService.fetchTableData('positions', this.id);
			this.positionData = data;
			console.log(this.positionData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			const data = await this.supabaseService.fetchTableData('employees', this.id);
			this.employeeData = data;
			console.log(this.employeeData[0].linkedin_url);

			if (this.employeeData[0].linkedin_url) {
				this.hasEmployeeLinkedin = true;
			}

			console.log(this.hasEmployeeLinkedin);
			this.employeeName =
				this.employeeData[0].name + ' ' + this.employeeData[0].firstname + ' ' + this.employeeData[0].lastname;
			console.log(this.employeeData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			const data = await this.supabaseService.fetchTableData('positions_external', this.id);
			this.positionExternalData = data;
			console.log(this.positionExternalData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			const data = await this.supabaseService.fetchTableData('records', this.id);
			this.recordData = data;
			if (this.recordData[0].linkedin_url) {
				this.hasRecordLinkedin = true;
			}
			console.log(this.hasRecordLinkedin);
			console.log(this.recordData);
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
