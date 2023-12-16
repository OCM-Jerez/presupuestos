import { Component, OnInit } from '@angular/core';
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
	}

	async fetchData() {
		try {
			const data = await this.supabaseService.fetchTableData('positions');
			this.positionData = data;

			console.log(this.positionData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			const data = await this.supabaseService.fetchTableData('employees');
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
			const data = await this.supabaseService.fetchTableData('positions_external');
			this.positionExternalData = data;
			console.log(this.positionExternalData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			const data = await this.supabaseService.fetchTableData('records');
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
}
