import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';

import { TableService } from '@services/table.service';

import { environment } from '@environments/environment';

import { IDataTable } from '@interfaces/dataTable.interface';
import { IExample } from '@interfaces/example.interface';
import { ITablaAleatoria } from '@interfaces/tablaAleatoria.interface';
import { IDataIngreso } from '@interfaces/dataIngreso.interface';
import { IDataGasto } from '@interfaces/dataGasto.interface';

@Component({
	selector: 'app-card-table',
	templateUrl: './card-table.component.html',
	styleUrls: ['./card-table.component.scss'],
	standalone: true,
	imports: [NgFor]
})
export class CardTableComponent implements OnInit {
	private _tableService = inject(TableService);

	textoTabla: string;
	liqDate = environment.liqDate2023;
	examples: IExample[] = Array(3).fill({ name: '', value: 0 });

	ngOnInit(): void {
		this._randomData();
	}

	private async _randomData(): Promise<void> {
		const dataTable: IDataTable = await this._tableService.loadDataInitial();
		let dataTablaAleatoria: ITablaAleatoria[] = [];
		const ingresoGasto = Math.random() >= 0.5 ? true : false;
		ingresoGasto
			? (dataTablaAleatoria = await this.getData('DesEco', 'DerechosReconocidosNetos1', dataTable.rowDataIngresos))
			: (dataTablaAleatoria = await this.getData('DesOrg', 'Pagos1', dataTable.rowDataGastos));

		this.textoTabla = ingresoGasto
			? '¿Cuánto ha recaudado el Ayuntamiento por...?'
			: '¿Cuánto ha gastado la delegación de...?';

		this.fillDatosAleatorios(dataTablaAleatoria);
	}

	async getData(name: string, value: string, data: (IDataIngreso | IDataGasto)[] = []) {
		const resultado = data.reduce((acc, curr) => {
			const itemName = curr[name];
			const itemValue = curr[value];
			const itemEncontrado = acc.find((item) => item.name === itemName);

			if (itemEncontrado) {
				itemEncontrado.value += itemValue;
			} else {
				acc.push({
					name: itemName,
					value: itemValue
				});
			}

			return acc;
		}, []);

		return resultado;
	}

	fillDatosAleatorios(dataTablaAleatoria) {
		dataTablaAleatoria.sort(() => Math.random() - 0.5);
		const data = dataTablaAleatoria.slice(0, 3);
		this.examples = data.map(({ name, value }) => ({
			name,
			value: value.toLocaleString('de-DE')
		}));
	}
}
