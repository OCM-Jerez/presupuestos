import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TableService } from '../services/table.service';

import { IDataTable } from '../commons/interfaces/dataTable.interface';
import { CLASIFICATION_TYPE } from '../commons/util/util';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _dataTable: IDataTable;
  private _arrayIngresos = [];
  private _arrayGastos = [];
  // private _arrRandom: number[] = [];
  textoTabla: string;
  textEjemplo1: string;
  textEjemplo2: string;
  textEjemplo3: string;
  valueEjemplo1: number;
  valueEjemplo2: number;
  valueEjemplo3: number;

  constructor(
    private _tableService: TableService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._randomData()
  }

  private async _randomData(): Promise<void> {
    const ingresoGasto = (Math.random() >= 0.5) ? true : false;
    let dataTablaAleatoria: any[] = [];

    // Cambio ingresosEconomicaArticulos a ingresosEconomicaEconomicos para tener todos los Items.
    // Se necesita para tener todos los datos de ingresos y gastos.
    // esta data la almacenaremos para usarla hasta que se haga un cambio en los años seleccionados.
    // Para guardar los datos de ingresos y gastos, necesitamos crear otro objeto.
    // Ahora solo guardamos el ultimo objeto que se ha cargado. 
    this._dataTable = await this._tableService.loadData('ingresosEconomicaEconomicos');
    let dataIngresos = this._dataTable.rowData;
    this._dataTable = await this._tableService.loadData('gastosOrganicaOrganicos');
    let dataGastos = this._dataTable.rowData;

    this.textoTabla = ingresoGasto ? '¿Cuanto recauda el Ayuntamiento por...?' : '¿Cuanto ha gastado la delegación de...?';

    if (ingresoGasto) {
      dataTablaAleatoria = await this.getData('DesEco', 'DerechosReconocidosNetos2022', dataIngresos);
    } else {
      dataTablaAleatoria = await this.getData('DesOrg', 'Pagos2022', dataGastos);
    }

    // Totalizo
    dataTablaAleatoria = dataTablaAleatoria.reduce((acc, { name, value }) => {
      const item = acc.find(item => item.name === name)
      item ? item.value += value : acc.push({
        name,
        value,
      });
      return acc;
    }, []);
    dataTablaAleatoria.sort(() => Math.random() - 0.5);
    console.log('dataTablaAleatoria', dataTablaAleatoria);

    this.textEjemplo1 = dataTablaAleatoria[0].name;
    this.valueEjemplo1 = dataTablaAleatoria[0].value.toLocaleString("de-DE");
    this.textEjemplo2 = dataTablaAleatoria[1].name;
    this.valueEjemplo2 = dataTablaAleatoria[1].value.toLocaleString("de-DE");
    this.textEjemplo3 = dataTablaAleatoria[2].name;
    this.valueEjemplo3 = dataTablaAleatoria[2].value.toLocaleString("de-DE");
  }

  async getData(name: string, value: string, data: any[] = []) {
    data = data.reduce((acc, curr) => {
      const item =
      {
        "name": curr[`${name}`],
        "value": curr[value],
      }
      acc.push(item);
      return acc;
    }, []);
    console.log('this._array', data);
    return data;
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


