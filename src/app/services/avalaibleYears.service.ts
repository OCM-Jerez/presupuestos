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

    if (this.yearsSelected.length > 1) {
      if (max === 2022) {
        message = `Liquidaciones ${min} al ${max} (Datos 2022 = ejecución al 01/09/2022)`
      } else {
        message = `Liquidaciones  ${min} al ${max}`
      }
    }
    else {
      if (max === 2022) {
        message = `${max} ejecución al 01/09/2022`
      } else {
        message = `Liquidación ${min}`
      }
    };
    ;
    // max === 2022 ? message = `Del año ${min} al ${max} (Datos del 2022 = ejecución al 01/09/2022)` : message = `Año ${min} (Datos del 2022 = ejecución al 01/09/2022)`;
    // this.yearsSelected.length === 1 && max === 2022 ? message = ` Comparativa liquidaciones del año ${min} al ${max} Los datos del 2022 corresponden a la ejecucion al día 01/09/2022` : message = `  ejecucion al día 01/09/2022`;
    // this.yearsSelected.length > 1 && max === 2022 ? message = ` Comparativa liquidaciones del año ${min} al ${max} Los datos del 2022 corresponden a la ejecucion al día 01/09/2022` : message = `  ejecucion al día 01/09/2022`;
    // this.yearsSelected.length > 1 && max !== 2022 ? message = ` Comparativa liquidaciones del año ${min} al ${max}` : message = ` liquidación año ${min}`;
    // max === 2022 ? message = ` Ejecución al 01/09/2022` : message = `Comparativa liquidaciones del año ${min} al ${max}. Los datos del 2022 corresponden a la ejecucion al día 01/09/2022`;
    // max != 2022 ? message = `Comparativa liquidaciones del año ${min} al ${max}` : message = `Comparativa liquidaciones del año ${min} al ${max}`;
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