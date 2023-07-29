import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

import { ReloadTableService } from '@services/reloadTable.service';
import { AvalaibleYearsService } from '@services/avalaibleYears.service';

@Component({
	selector: 'app-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
	standalone: true,
	imports: [NgFor, NgIf, FormsModule]
})
export class CheckboxComponent implements OnInit {
	@Input() multiYears: boolean;
	@Output() hasChangeCheckbox = new EventEmitter<boolean>();
	public years: { year: number; checked: boolean }[] = [
		{ year: 2015, checked: false },
		{ year: 2016, checked: false },
		{ year: 2017, checked: false },
		{ year: 2018, checked: false },
		{ year: 2019, checked: false },
		{ year: 2020, checked: false },
		{ year: 2021, checked: false },
		{ year: 2022, checked: false },
		{ year: 2023, checked: true }
	];
	public textButton = 'Todos';
	private _avalaibleYearsService = inject(AvalaibleYearsService);
	private _reloadTableService = inject(ReloadTableService);

	ngOnInit(): void {
		this.getSelectedItem();
	}

	private getSelectedItem() {
		if (localStorage.getItem('selected_years') === null) {
			const selectedYears = this.years.filter((item) => item.checked);
			localStorage.setItem('selected_years', JSON.stringify(selectedYears)); //store years selected
			return;
		}

		// actualizo años seleccionados
		const storedSelectedYears = JSON.parse(localStorage.getItem('selected_years')) as {
			year: number;
			checked: boolean;
		}[];
		this.years
			.filter((year) => storedSelectedYears.find((yearFind) => yearFind.year === year.year))
			.forEach((yearFilter) => (yearFilter.checked = true));

		if (!this.multiYears && storedSelectedYears.length > 1) {
			// Solo se puede seleccionar un año
			this.years.forEach((year) => (year.checked = false));
			this.years[this.years.length - 1].checked = true; // por defecto selecciona último año disponible
		}
	}

	changeCheckbox(yearSelected: { year: number; checked: boolean }) {
		if (!this.multiYears) {
			// Solo se puede seleccionar un año
			const yearFind = this.years.find((yearFind) => yearFind.year === yearSelected.year);
			this.years.forEach((year) => (year.checked = false));
			yearFind.checked = true;
			console.log('yearFind', yearFind);
		}

		// this.hasChangeCheckbox.emit();

		this._setLocalStorage();
	}

	toggle() {
		this.textButton = this.textButton === 'Todos' ? 'Actual' : 'Todos';
		this.years = this.years.map((item, index, array) => ({
			...item,
			checked: this.textButton === 'Actual' ? true : index === array.length - 1
		}));
		this._setLocalStorage();
	}

	_setLocalStorage() {
		const selectedYears = this.years.filter((item) => item.checked);
		localStorage.setItem('selected_years', JSON.stringify(selectedYears));
		const yearSelecteds = selectedYears.map((year) => year.year);
		this._avalaibleYearsService.setYearsSelected(yearSelecteds);
		this._reloadTableService.triggerReloadTable();
	}
}
