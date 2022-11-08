import { CLASIFICATION_TYPE } from './../../commons/util/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataStoreService } from '../../services/dataStore.service';
import { TableGastosComponent } from './components/table-gastos/table-gastos.component';
import { IButtonClasification } from './model/components.interface';
import { getClasificacion } from '../data-table';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {
  @ViewChild('table') tableAg!: TableGastosComponent;

  constructor(private _dataStoreService: DataStoreService, private _tableService: TableService) { }
  buttons = getClasificacion('gastosOrganicaOrganicos').buttons;

  showTable = true;
  ngOnInit(): void {
  }

  clickButton(button: IButtonClasification): void {
    const selectedCodeRowFirstLevel = this.tableAg.selectedCodeRowFirstLevel;

    if (selectedCodeRowFirstLevel) {
      this.showTable = false;

      this._dataStoreService.selectedCodeRowFirstLevel = selectedCodeRowFirstLevel;
      const dataPropertyTable = getClasificacion('gastosProgramaProgramas');
      const useStarWitch: boolean = dataPropertyTable.useStarWitch;
      const attribute: string = dataPropertyTable.attribute;

      this._tableService.loadDataForTypeClasification(
        false,
        'gastosProgramaProgramas',
        { valueFilter: this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0], attribute, useStarWitch }).then(() => {
          setTimeout(() => {
            this.buttons = dataPropertyTable.buttons;
            this.showTable = true;
          }, 100);

        });


    }
  }
}
