import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { environment } from '@environments/environment';

@Injectable()
export class AvalaibleYearsService {
	public subject$ = new BehaviorSubject<string>(environment.currentYear.toString());
	public yearsSubject$ = new BehaviorSubject<number[]>([environment.currentYear]);
	public yearsSelected: number[] = [];

	public getAvalaibleYear() {
		return this.subject$.asObservable();
	}

	// Devuelve el array con los años seleccionados
	getYearsSelected(): number[] {
		if (this.yearsSelected.length === 0) {
			// Mientras no existan datos del año actual resto 1 al año actual
			this.yearsSelected.push(new Date().getFullYear() - 1);
			// this.yearsSelected.push(new Date().getFullYear());
		}

		return this.yearsSelected;
	}

	setYearsSelected(yearSelected: number[]): number[] {
		this.yearsSelected = yearSelected;
		this.yearsSubject$.next(this.yearsSelected);
		return this.yearsSelected;
	}
}
