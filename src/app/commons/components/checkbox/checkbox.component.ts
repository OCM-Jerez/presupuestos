import { Component, Input, OnInit } from '@angular/core';
import { AvalaibleYearsService } from '../../../services/avalaibleYears.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() multiYears: boolean;
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
      // {
      //   year: 'Todos',
      //   checked: false,
      // },
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
    if (localStorage.getItem('selected_years') === null) {
      this.years[7].checked = true // por defecto selecciona último año disponible
      const selectedYears = this.years.filter(item => item.checked);
      localStorage.setItem("selected_years", JSON.stringify(selectedYears)); //store years selected
      const yearSelecteds = selectedYears.map((year) => year.year);
      this._avalaibleYearsService.generateMessage(yearSelecteds);
      return;
    }

    const storedSelectedYears = JSON.parse(localStorage.getItem("selected_years")) as { year: number, checked: boolean }[]; //get them back
    // actualizo años seleccionados
    this.years.filter((year) => storedSelectedYears.find((yearFind) => yearFind.year === year.year)).forEach((yearFilter) => yearFilter.checked = true);
    if (this.years.filter.length < 0) {
      this.years[7].checked = true
    }
    const yearSelecteds = storedSelectedYears.map((year) => year.year);
    this._avalaibleYearsService.generateMessage(yearSelecteds);
  }

  changeCheckbox(yearSelected: { year: number, checked: boolean }) {
    console.log(this.multiYears);

    if (yearSelected.year === this.years[8].year) {
      const isAll = this.years[8].checked === true;
      this.years[8].year = isAll ? 'Ninguno' : 'Todos';
      this.years.forEach((year) => year.checked = isAll);
    }
    this.years[8].checked = false
    var selectedYears = this.years.filter(item => item.checked);

    if (!this.multiYears) {
      if (selectedYears.length > 1) {
        console.log("Ya hay un año seleccionado")
        console.log(yearSelected.year);
        const yearFind = this.years.find((yearFind) => yearFind.year === yearSelected.year);
        console.log(yearFind);
      } else {
        console.log("Puedes seleccionar más años");
      }
    }

    localStorage.setItem("selected_years", JSON.stringify(selectedYears)); //store years selected
    const yearSelecteds = selectedYears.map((year) => year.year);
    this._avalaibleYearsService.generateMessage(yearSelecteds);
  }

}
