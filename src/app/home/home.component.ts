import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataStoreService } from '../services/dataStore.service';
import { TableService } from '../services/table.service';
// import { PrepareDataTotalesPresupuestoService } from '../services/prepareDataTotalesPresupuesto.service';

import { IDataTable } from '../commons/interfaces/dataTable.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _dataTable: IDataTable;
  private _arrRandom: number[] = [];
  textEjemplo1: string;
  textEjemplo2: string;
  textEjemplo3: string;
  valueEjemplo1: number;
  valueEjemplo2: number;
  valueEjemplo3: number;
  // totalPresupuestoIngresos: number;
  // totalPresupuestoGastos: number;
  // totalEjecutadoIngresos: number;
  // totalEjecutadoGastos: number;
  textoTabla: string;

  constructor(
    private _router: Router,
    private _dataStoreService: DataStoreService,
    private _tableService: TableService,
    // private _prepareDataTotalesPresupuestoService: PrepareDataTotalesPresupuestoService
  ) { }

  ngOnInit(): void {
    this._loadData()
  }

  private async _loadData(): Promise<void> {
    //  Calculo totales de ingresos y gastos y los guardo en _dataStoreService  */
    // await this._prepareDataTotalesPresupuestoService.calcTotales();

    /* #region datos aleatorios para la tabla de ejemplos  */
    const ingresoGasto = (Math.random() >= 0.5) ? true : false;
    if (ingresoGasto) {
      await this._tableService.loadDataForTypeClasification('ingresosEconomicaArticulos');
      this._dataTable = this._dataStoreService.getDataTable
      let dataIngresos = this._dataTable.rowData;

      let array = [];
      array = dataIngresos.reduce((acc, curr) => {
        const item =
        {
          "name": curr['DesArt'],
          "value": curr['DerechosReconocidosNetos2022'],
        }
        acc.push(item);
        return acc;
      }, []);

      // Totalizo
      const dataTablaAleatoria = array.reduce((acc, { name, value }) => {
        const item = acc.find(item => item.name === name)
        item ? item.value += value : acc.push({
          name,
          value,
        });
        return acc;
      }, []);
      // console.log('dataTablaAleatoria', dataTablaAleatoria);

      this.random(1, dataTablaAleatoria.length - 1);
      const index1 = this._arrRandom[0];
      const index2 = this._arrRandom[1];
      const index3 = this._arrRandom[2];

      this.textoTabla = '¿Cuanto recauda el Ayuntamiento por...?'
      try {
        this.textEjemplo1 = dataTablaAleatoria[index1].name
        this.valueEjemplo1 = dataTablaAleatoria[index1].value.toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        this.textEjemplo2 = dataTablaAleatoria[index2].name
        this.valueEjemplo2 = dataTablaAleatoria[index2].value.toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        this.textEjemplo3 = dataTablaAleatoria[index3].name
        this.valueEjemplo3 = dataTablaAleatoria[index3].value.toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      } catch (error) {
        console.log('error', index1, index2, index3);
      }
    } else {
      await this._tableService.loadDataForTypeClasification('gastosOrganicaOrganicos');
      this._dataTable = this._dataStoreService.getDataTable
      let dataGastos = this._dataTable.rowData;

      let array = [];
      array = dataGastos.reduce((acc, curr) => {
        const item =
        {
          "name": curr['DesOrg'],
          "value": curr['Pagos2022'],
        }
        acc.push(item);
        return acc;
      }, []);

      //  Totalizo
      const dataTablaAleatoria = array.reduce((acc, { name, value }) => {
        const item = acc.find(item => item.name === name)
        item ? item.value += value : acc.push({
          name,
          value,
        });
        return acc;
      }, []);

      this.random(1, dataTablaAleatoria.length - 1);
      const index1 = this._arrRandom[0];
      const index2 = this._arrRandom[1];
      const index3 = this._arrRandom[2];

      this.textoTabla = '¿Cuanto ha gastado la delegación de...?'
      try {
        this.textEjemplo1 = dataTablaAleatoria[index1].name;
        this.valueEjemplo1 = dataTablaAleatoria[index1].value.toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        this.textEjemplo2 = dataTablaAleatoria[index2].name;
        this.valueEjemplo2 = dataTablaAleatoria[index2].value.toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        this.textEjemplo3 = dataTablaAleatoria[index3].name;
        this.valueEjemplo3 = dataTablaAleatoria[index3].value.toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      } catch (error) {
        console.log('error', index1, index2, index3);

      }

    }
    /* #endregion */
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
    this._router.navigateByUrl('/detallePresupuesto')
  }

  random(min: number, max: number) {
    while (this._arrRandom.length < 3) {
      const r = Math.floor((Math.random() * (max - min + 1)) + min);
      if (this._arrRandom.indexOf(r) === -1) this._arrRandom.push(r);
    }
  }

  // async preparaDataTable(data: any, descripcion, campoSumatorio) {
  //   let array = [];
  //   array = data.reduce((acc, curr) => {
  //     const item =
  //     {
  //       "name": curr[descripcion],
  //       "value": curr[campoSumatorio],
  //     }
  //     acc.push(item);
  //     return acc;
  //   }, []);

  //   // Totalizo
  //   const dataTotal = array.reduce((acc, { name, value }) => {
  //     const item = acc.find(item => item.name === name)
  //     item ? item.value += value : acc.push({
  //       name,
  //       value,
  //     });
  //     return acc;
  //   }, []);
  //   return dataTotal

  // }

}


