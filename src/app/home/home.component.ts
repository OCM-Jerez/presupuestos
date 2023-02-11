import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TableService } from '../services/table.service';

import { IDataTable } from '../commons/interfaces/dataTable.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _dataTable: IDataTable;
  textoTabla: string;
  examples: { name: string; value: number }[] = [
    { name: '', value: 0 },
    { name: '', value: 0 },
    { name: '', value: 0 },
  ];
  dataTablaAleatoria: any[] = [];

  constructor(
    private _tableService: TableService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._randomData()
  }

  private async _randomData(): Promise<void> {
    this._dataTable = await this._tableService.loadDataInitial();

    const ingresoGasto = (Math.random() >= 0.5) ? true : false;
    ingresoGasto
      ? this.dataTablaAleatoria = await this.getData('DesEco', 'DerechosReconocidosNetos2022', this._dataTable.rowDataIngresos)
      : this.dataTablaAleatoria = await this.getData('DesOrg', 'Pagos2022', this._dataTable.rowDataGastos);
    this.textoTabla = ingresoGasto ? '¿Cuánto recauda el Ayuntamiento por...?' : '¿Cuánto ha gastado la delegación de...?';
    await this.fillDatosAleatorios();
  }

  async getData(name: string, value: string, data: any[] = []) {

    const resultado = data.reduce((acc, curr) => {
      const itemName = curr[name];
      const itemValue = curr[value];

      const itemEncontrado = acc.find(item => item.name === itemName);
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
    this.dataTablaAleatoria.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 3; i++) {
      this.examples[i].name = this.dataTablaAleatoria[i].name;
      this.examples[i].value = this.dataTablaAleatoria[i].value.toLocaleString("de-DE");
    }
  }

  visionGlobal() {
    this._router.navigateByUrl('/home')
  }

  detallePresupuesto() {
    this._router.navigateByUrl('/detallePresupuesto')
  }

  licitaciones() {
    window.open('https://con.ocmjerez.org/', '_blank');
  }

  empleados() {
    this._router.navigateByUrl('/empleados')
  }

}


