import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AvalaibleYearsService {
	public subject$ = new BehaviorSubject<string>('2023');
	public yearsSubject$ = new BehaviorSubject<number[]>([2023]);
	public yearsSelected: number[] = [];

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

		return this.yearsSelected;
	}

	setYearsSelected(yearSelected: number[]): number[] {
		this.yearsSelected = yearSelected;
		this.yearsSubject$.next(this.yearsSelected);
		return this.yearsSelected;
	}
}
