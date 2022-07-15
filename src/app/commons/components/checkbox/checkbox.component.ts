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
      }, {
        year: 2017,
        checked: false,
      }, {
        year: 2018,
        checked: false,
      },
      {
        year: 2019,
        checked: false,
      }, {
        year: 2020,
        checked: false,
      }, {
        year: 2021,
        checked: true,
      }, {
        year: 2022,
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
    const years = this.result.map((year) => year.year);
    this._avalaibleYearsService.setAvalaibleYear(years);
  }

  changeCheckbox(event: Event) {
    this.getSelectedItem();
  }

}
