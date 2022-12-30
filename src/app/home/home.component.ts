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
  // textEjemplo1: string;
  // textEjemplo2: string;
  // textEjemplo3: string;
  // valueEjemplo1: number;
  // valueEjemplo2: number;
  // valueEjemplo3: number;
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
    // let dataIngresos = this._dataTable.rowDataIngresos;
    // let dataGastos = this._dataTable.rowDataGastos;

    // if (ingresoGasto) {
    //   this.dataTablaAleatoria = await this.getData('DesEco', 'DerechosReconocidosNetos2022', dataIngresos);
    // } else {
    //   this.dataTablaAleatoria = await this.getData('DesOrg', 'Pagos2022', dataGastos);
    // }

    const ingresoGasto = (Math.random() >= 0.5) ? true : false;
    ingresoGasto
      ? this.dataTablaAleatoria = await this.getData('DesEco', 'DerechosReconocidosNetos2022', this._dataTable.rowDataIngresos)
      : this.dataTablaAleatoria = await this.getData('DesOrg', 'Pagos2022', this._dataTable.rowDataGastos);

    this.textoTabla = ingresoGasto ? '¿Cuanto recauda el Ayuntamiento por...?' : '¿Cuanto ha gastado la delegación de...?';

    // await this.totalizar();
    // console.log(this.dataTablaAleatoria);

    await this.fillDatosAleatorios();
  }

  // async getData(name: string, value: string, data: any[] = []) {
  //   data = data.reduce((acc, curr) => {
  //     const item =
  //     {
  //       "name": curr[`${name}`],
  //       "value": curr[value],
  //     }
  //     acc.push(item);
  //     return acc;
  //   }, []);
  //   return data;
  // }

  // async totalizar() {
  //   this.dataTablaAleatoria = this.dataTablaAleatoria.reduce((acc, { name, value }) => {
  //     const item = acc.find(item => item.name === name)
  //     item ? item.value += value : acc.push({
  //       name,
  //       value,
  //     });
  //     return acc;
  //   }, []);
  // }

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
    console.log(resultado);

    return resultado;
  }

  // console.log(this.dataTablaAleatoria);
  async fillDatosAleatorios() {

    this.dataTablaAleatoria.sort(() => Math.random() - 0.5);
    // for (let i = 0; i < 4; i++) {
    //   this[`textEjemplo${i}`] = this.dataTablaAleatoria[i].name;
    //   this[`valueEjemplo${i}`] = this.dataTablaAleatoria[i].value.toLocaleString("de-DE");
    // }

    for (let i = 0; i < 3; i++) {
      this.examples[i].name = this.dataTablaAleatoria[i].name;
      this.examples[i].value = this.dataTablaAleatoria[i].value.toLocaleString("de-DE");
    }

    // this.textEjemplo1 = this.dataTablaAleatoria[0].name;
    // this.valueEjemplo1 = this.dataTablaAleatoria[0].value.toLocaleString("de-DE");
    // this.textEjemplo2 = this.dataTablaAleatoria[1].name;
    // this.valueEjemplo2 = this.dataTablaAleatoria[1].value.toLocaleString("de-DE");
    // this.textEjemplo3 = this.dataTablaAleatoria[2].name;
    // this.valueEjemplo3 = this.dataTablaAleatoria[2].value.toLocaleString("de-DE");
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


  // this.random(1, dataTablaAleatoria.length - 1);
  // const index1 = this._arrRandom[0];
  // const index2 = this._arrRandom[1];
  // const index3 = this._arrRandom[2];

  // try {
  //   this.textEjemplo1 = dataTablaAleatoria[index1].name
  //   this.valueEjemplo1 = dataTablaAleatoria[index1].value.toLocaleString();
  //   this.textEjemplo2 = dataTablaAleatoria[index2].name
  //   this.valueEjemplo2 = dataTablaAleatoria[index2].value.toLocaleString();
  //   this.textEjemplo3 = dataTablaAleatoria[index3].name
  //   this.valueEjemplo3 = dataTablaAleatoria[index3].value.toLocaleString();
  // } catch (error) {
  //   console.log('error', index1, index2, index3);
  // }

  // random(min: number, max: number) {
  //   while (this._arrRandom.length < 3) {
  //     const r = Math.floor((Math.random() * (max - min + 1)) + min);
  //     if (this._arrRandom.indexOf(r) === -1) this._arrRandom.push(r);
  //   }
  // }

}


