import { leadingComment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AvalaibleYearsService } from '../../../services/avalaibleYears.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
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
        checked: true,
      },
      {
        year: 'Todos',
        checked: false,
      },
    ]
    this.getSelectedItem();
  }

  get result(): {
    year: number,
    checked: boolean,
  }[] {
    return this.years.filter(item => item.checked);
  }

  private getSelectedItem(tipo?: string) {
    if (localStorage.getItem('selected_years') === null) {
      const selectedYears = this.result;
      localStorage.setItem("selected_years", JSON.stringify(selectedYears)); //store years selected
      const yearSelecteds = selectedYears.map((year) => year.year);
      this._avalaibleYearsService.generateMessage(yearSelecteds);
      return;
    }

    const storedSelectedYears = JSON.parse(localStorage.getItem("selected_years")) as { year: number, checked: boolean }[]; //get them back
    // actualizo años seleccionados
    this.years.filter((year) => storedSelectedYears.find((yearFind) => yearFind.year === year.year)).forEach((yearFilter) => yearFilter.checked = true);

    // for (let i = 0; i < storedSelectedYears.length; i++) {
    //   for (let j = 0; j < this.years.length; j++) {
    //     if (storedSelectedYears[i] === this.years[j].year) {
    //       this.years[j].checked = true
    //     }
    //   }
    // }
    const yearSelecteds = storedSelectedYears.map((year) => year.year);
    this._avalaibleYearsService.generateMessage(yearSelecteds);
  }

  changeCheckbox(yearSelected: { year: number, checked: boolean }) {

    if (yearSelected.year === this.years[8].year) {
      const isAll = this.years[8].checked === true;
      this.years[8].year = isAll ? 'Ninguno' : 'Todos';
      this.years.forEach((year) => year.checked = isAll);
    }



    // if (this.years[8].checked === true) {
    //   this.years.forEach((year) => year.checked = true);
    //   this.years[8].year = 'Ninguno';

    // for (let j = 0; j < this.years.length - 1; j++) {
    //   this.years[j].checked = true
    // }
    // this.years.map((element, index) => {
    //   console.log(element, index);
    //   if (index < this.years.length) { element[index].checked = true }
    // })
    // }
    // else {
    //   this.years[8].year = 'Todos';
    //   this.years.forEach((year) => year.checked = false);

    //   for (let j = 0; j < this.years.length; j++) {
    //     this.years[j].checked = false
    //   }
    // }
    this.years[8].checked = false
    const selectedYears = this.result;
    localStorage.setItem("selected_years", JSON.stringify(selectedYears)); //store years selected

    const yearSelecteds = selectedYears.map((year) => year.year);
    this._avalaibleYearsService.generateMessage(yearSelecteds);
    //this.getSelectedItem();
  }

}
