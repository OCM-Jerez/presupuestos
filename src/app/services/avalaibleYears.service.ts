import { Injectable } from '@angular/core';
// https://stackoverflow.com/questions/54476526/how-to-reload-the-header-component-when-the-variable-value-changes-via-service/54476754
import { environment } from '@environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AvalaibleYearsService {
	public subject$ = new BehaviorSubject<string>('2021');
	public yearsSelected: number[] = [];
	private _message = '';

	public set message(message: string) {
		this._message = message;
	}

	public get message(): string {
		// console.log(this._message);
		return this._message;
	}

	generateMessage(yearSelected: number[]) {
		this.yearsSelected = yearSelected;
		const min = Math.min(...this.yearsSelected);
		const max = Math.max(...this.yearsSelected);
		let message: string;

		if (this.yearsSelected.length > 1) {
			if (max === 2022) {
				message = `Liquidaciones ${min} al ${max} (Datos 2022 = ejecución al ${environment.liqDate2022})`;
			} else {
				message = `Liquidaciones  ${min} al ${max}`;
			}
		} else {
			if (max === 2022) {
				message = `${max} ejecución al ${environment.liqDate2022}`;
			} else {
				message = `Liquidación ${min}`;
			}
		}

		if (this.yearsSelected.length > 1) {
			if (max === 2023) {
				message = `Liquidaciones ${min} al ${max} (Datos 2023 = ejecución al ${environment.liqDate2023})`;
			} else {
				message = `Liquidaciones  ${min} al ${max}`;
			}
		} else {
			if (max === 2023) {
				message = `${max} ejecución al ${environment.liqDate2023}`;
			} else {
				message = `Liquidación ${min}`;
			}
		}

		this.message = message;
	}

	public getAvalaibleYear() {
		return this.subject$.asObservable();
	}

	// Devuelve el array con los años seleccionados
	getYearsSelected(): number[] {
		if (this.yearsSelected.length === 0) {
			// Mientras no existan datos del 2023 resto 1 al año actual
			// this.yearsSelected.push((new Date().getFullYear()) - 1);
			this.yearsSelected.push(new Date().getFullYear());
		}
		// console.log(this.yearsSelected);

		return this.yearsSelected;
	}

	setYearsSelected(yearSelected: number[]): number[] {
		this.yearsSelected = yearSelected;
		return this.yearsSelected;
	}
}
