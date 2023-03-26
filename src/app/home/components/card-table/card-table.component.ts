import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { IDataTable } from '../../../commons/interfaces/dataTable.interface';
import { IExample } from '../../../commons/interfaces/example.interface';
import { ITablaAleatoria } from '../../../commons/interfaces/tablaAleatoria.interface';
import { TableService } from '../../../services/table.service';

@Component({
    selector: 'app-card-table',
    templateUrl: './card-table.component.html',
    styleUrls: ['./card-table.component.scss'],
})
export class CardTableComponent implements OnInit {
    private _dataTable: IDataTable;
    private _dataTablaAleatoria: ITablaAleatoria[] = [];
    textoTabla: string;
    liqDate = environment.liqDate2023;
    examples: IExample[] = Array.from({ length: 3 }, () => ({
        name: '',
        value: 0,
    }));

    constructor(private _tableService: TableService, private _router: Router) {}

    ngOnInit(): void {
        this._randomData();
    }

    private async _randomData(): Promise<void> {
        this._dataTable = await this._tableService.loadDataInitial();

        const ingresoGasto = Math.random() >= 0.5 ? true : false;
        ingresoGasto
            ? (this._dataTablaAleatoria = await this.getData(
                  'DesEco',
                  'DerechosReconocidosNetos2023',
                  this._dataTable.rowDataIngresos
              ))
            : (this._dataTablaAleatoria = await this.getData(
                  'DesOrg',
                  'Pagos2023',
                  this._dataTable.rowDataGastos
              ));

        this.textoTabla = ingresoGasto
            ? '¿Cuánto ha recaudado el Ayuntamiento por...?'
            : '¿Cuánto ha gastado la delegación de...?';

        await this.fillDatosAleatorios();
    }

    async getData(name: string, value: string, data: any[] = []) {
        const resultado = data.reduce((acc, curr) => {
            const itemName = curr[name];
            const itemValue = curr[value];
            const itemEncontrado = acc.find((item) => item.name === itemName);

            if (itemEncontrado) {
                itemEncontrado.value += itemValue;
            } else {
                acc.push({
                    name: itemName,
                    value: itemValue,
                });
            }

            return acc;
        }, []);

        return resultado;
    }

    async fillDatosAleatorios() {
        this._dataTablaAleatoria.sort(() => Math.random() - 0.5);

        for (let i = 0; i < 3; i++) {
            this.examples[i].name = this._dataTablaAleatoria[i].name;
            this.examples[i].value =
                this._dataTablaAleatoria[i].value.toLocaleString('de-DE');
        }
    }
}
