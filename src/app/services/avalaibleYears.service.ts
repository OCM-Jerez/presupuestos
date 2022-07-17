import { Injectable } from '@angular/core';
// https://stackoverflow.com/questions/54476526/how-to-reload-the-header-component-when-the-variable-value-changes-via-service/54476754
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AvalaibleYearsService {
  public subject$ = new BehaviorSubject<string>('2021');
  public yearsSelected: number[] = [];
  public setAvalaibleYear(yearSelected: number[]): void {
    this.yearsSelected = yearSelected;
    const min = Math.min(...this.yearsSelected);
    const max = Math.max(...this.yearsSelected);
    let message: string;
    this.yearsSelected.length > 1 ? message = ` liquidaciones del año ${min} al ${max}` : message = ` liquidación año ${min}`;
    this.subject$.next(message);
  }

  public getAvalaibleYear() {
    return this.subject$.asObservable();
  }

  // Devuelve el array con los años seleccionados
  getYearsSelected(): number[] {
    return this.yearsSelected;
  }

}