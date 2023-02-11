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
  years: any[] = [];

  constructor(
    private _avalaibleYearsService: AvalaibleYearsService,
  ) { }

  ngOnInit(): void {
    this.years = [
      {
        year: 2015,
        checked: false,
      },
      {
        year: 2016,
        checked: false,
      },
      {
        year: 2017,
        checked: false,
      },
      {
        year: 2018,
        checked: false,
      },
      {
        year: 2019,
        checked: false,
      },
      {
        year: 2020,
        checked: false,
      },
      {
        year: 2021,
        checked: false,
      },
      {
        year: 2022,
        checked: false,
      },
    ]

    if (this.multiYears) {
      this.years.push({
        year: 'Todos',
        checked: false,
      },)
    }

    this.getSelectedItem();
  }

  private getSelectedItem(tipo?: string) {
    if (this.multiYears) {   // Solo se puede seeleccionar un año

      if (localStorage.getItem('selected_years') === null) {
        this.years[7].checked = true                                            // por defecto selecciona último año disponible
        const selectedYears = this.years.filter(item => item.checked);
        localStorage.setItem("selected_years", JSON.stringify(selectedYears));  //store years selected
        const yearSelecteds = selectedYears.map((year) => year.year);
        this._avalaibleYearsService.generateMessage(yearSelecteds);
        return;
      }

      const storedSelectedYears = JSON.parse(localStorage.getItem("selected_years")) as { year: number, checked: boolean }[];
      // actualizo años seleccionados
      this.years.filter((year) => storedSelectedYears.find((yearFind) => yearFind.year === year.year)).forEach((yearFilter) => yearFilter.checked = true);

      if (this.years.filter.length < 0) {
        this.years[7].checked = true
      }
      const yearSelecteds = storedSelectedYears.map((year) => year.year);
      this._avalaibleYearsService.generateMessage(yearSelecteds);
    } else {
      if (localStorage.getItem('selected_years') !== null) {
        const storedSelectedYears = JSON.parse(localStorage.getItem("selected_years")) as { year: number, checked: boolean }[];
        this.years.filter((year) => storedSelectedYears.find((yearFind) => yearFind.year === year.year)).forEach((yearFilter) => yearFilter.checked = true);
        console.log(storedSelectedYears);

        if (storedSelectedYears.length === 1) {
          const yearSelecteds = storedSelectedYears.map((year) => year.year);
          this._avalaibleYearsService.generateMessage(yearSelecteds);
        } else {
          this.years.forEach((year) => year.checked = false);
          this.years[7].checked = true // por defecto selecciona último año disponible
        }

      }

    }
  }

  changeCheckbox(yearSelected: { year: number, checked: boolean }) {
    if (!this.multiYears) {   // Solo se puede seeleccionar un año
      const yearFind = this.years.find((yearFind) => yearFind.year === yearSelected.year);
      this.years.forEach((year) => year.checked = false);
      yearFind.checked = true;
    } else {
      if (yearSelected.year === this.years[8].year) {
        const isAll = this.years[8].checked === true;
        this.years[8].year = isAll ? 'Ninguno' : 'Todos';
        this.years.forEach((year) => year.checked = isAll);
      }
      this.years[8].checked = false
    }

    let selectedYears = this.years.filter(item => item.checked);
    localStorage.setItem("selected_years", JSON.stringify(selectedYears)); //store years selected
    const yearSelecteds = selectedYears.map((year) => year.year);
    this._avalaibleYearsService.generateMessage(yearSelecteds);
    this.hasChangeCheckbox.emit();
  }

}


