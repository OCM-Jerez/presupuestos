import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ReloadTableService } from '@services/reloadTable.service';

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
	// private _lenghtYears: number;

	private _avalaibleYearsService = inject(AvalaibleYearsService);
	private _reloadTableService = inject(ReloadTableService);

	ngOnInit(): void {
		// this.years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023].map((year) => ({ year, checked: false }));
		// this.years = this.years.map((year, index, array) => {
		// 	return {
		// 		year: year,
		// 		checked: index === array.length - 1 ? true : false
		// 	};
		// });
		// this._lenghtYears = this.years.length;

		// if (this.multiYears) {
		// 	this.years.push({
		// 		year: 'Todos',
		// 		checked: false
		// 	});
		// }

		this.getSelectedItem();
	}

	private getSelectedItem() {
		if (localStorage.getItem('selected_years') === null) {
			// this.years[this._lenghtYears].checked = true; // por defecto selecciona último año disponible
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
		} else {
			// if (yearSelected.year === this.years[this._lenghtYears].year) {
			// 	const isAll = this.years[this._lenghtYears].checked === true;
			// 	this.years[this._lenghtYears].year = isAll ? 'Actual' : 'Todos';
			// 	this.years.forEach((year) => (year.checked = isAll));
			// 	this.years[this._lenghtYears - 1].checked = true;
			// }
			// this.years[this._lenghtYears].checked = false;
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
