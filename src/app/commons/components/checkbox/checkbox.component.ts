import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AvalaibleYearsService } from '../../../services/avalaibleYears.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() multiYears: boolean;
  @Output() hasChangeCheckbox = new EventEmitter<boolean>();
  public years: any[] = [];
  private _lenghtYears: number;

  constructor(
    private _avalaibleYearsService: AvalaibleYearsService,
  ) { }

  ngOnInit(): void {
    this.years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022].map(year => ({ year, checked: false }));
    this._lenghtYears = this.years.length;

    if (this.multiYears) {
      this.years.push({
        year: 'Todos',
        checked: false,
      },)
    }

    this.getSelectedItem();
  }

  private getSelectedItem(tipo?: string) {
    if (this.multiYears) {   // Se pueden seleccionar varios años

      if (localStorage.getItem('selected_years') === null) {
        this.years[this._lenghtYears - 1].checked = true                              // por defecto selecciona último año disponible
        const selectedYears = this.years.filter(item => item.checked);
        localStorage.setItem("selected_years", JSON.stringify(selectedYears));       //store years selected
        const yearSelecteds = selectedYears.map((year) => year.year);
        this._avalaibleYearsService.generateMessage(yearSelecteds);
        return;
      }

      const storedSelectedYears = JSON.parse(localStorage.getItem("selected_years")) as { year: number, checked: boolean }[];
      // actualizo años seleccionados
      this.years.filter((year) => storedSelectedYears.find((yearFind) => yearFind.year === year.year)).forEach((yearFilter) => yearFilter.checked = true);

      if (this.years.filter.length < 0) {
        this.years[this._lenghtYears - 1].checked = true                            // por defecto selecciona último año disponible
      }
      const yearSelecteds = storedSelectedYears.map((year) => year.year);
      this._avalaibleYearsService.generateMessage(yearSelecteds);
    } else {
      if (localStorage.getItem('selected_years') !== null) {
        const storedSelectedYears = JSON.parse(localStorage.getItem("selected_years")) as { year: number, checked: boolean }[];
        this.years.filter((year) => storedSelectedYears.find((yearFind) => yearFind.year === year.year)).forEach((yearFilter) => yearFilter.checked = true);

        if (storedSelectedYears.length === 1) {
          const yearSelecteds = storedSelectedYears.map((year) => year.year);
          this._avalaibleYearsService.generateMessage(yearSelecteds);
        } else {
          this.years.forEach((year) => year.checked = false);
          this.years[this._lenghtYears - 1].checked = true                         // por defecto selecciona último año disponible
        }

      }

    }
  }

  changeCheckbox(yearSelected: { year: number, checked: boolean }) {
    if (!this.multiYears) {   // Solo se puede seleccionar un año
      const yearFind = this.years.find((yearFind) => yearFind.year === yearSelected.year);
      this.years.forEach((year) => year.checked = false);
      yearFind.checked = true;
    } else {
      if (yearSelected.year === this.years[this._lenghtYears].year) {
        const isAll = this.years[this._lenghtYears].checked === true;
        this.years[this._lenghtYears].year = isAll ? 'Ninguno' : 'Todos';
        this.years.forEach((year) => year.checked = isAll);
      }
      this.years[this._lenghtYears].checked = false
    }

    let selectedYears = this.years.filter(item => item.checked);
    localStorage.setItem("selected_years", JSON.stringify(selectedYears)); //store years selected
    const yearSelecteds = selectedYears.map((year) => year.year);
    this._avalaibleYearsService.generateMessage(yearSelecteds);
    this.hasChangeCheckbox.emit();
  }

}


