import { Injectable } from '@angular/core';

import { IDataTotalesPresupuesto } from '../commons/interfaces/dataTotalesPresupuesto.interface';
import { DataStoreService } from './dataStore.service';

@Injectable({
    providedIn: 'root',
})
export class PrepareDataTotalesPresupuestoService {
    private _totalPresupuestoIngresos: any;
    private _totalPresupuestoGastos: any;

    constructor(private _dataStoreService: DataStoreService) {}

    calcTotales() {
        this.calcPresupuestoIngresos();
        this.calcPresupuestoGastos();
        this.setTotalesPresupuesto();
    }

    calcPresupuestoIngresos() {
        this._totalPresupuestoIngresos = {};
        const include = ['Definitivas2023', 'DerechosReconocidosNetos2023'];

        // Iterar sobre cada fila de la tabla de datos
        const rowDataIngresos = this._dataStoreService.dataTable.rowDataIngresos;
        console.log('rowDataIngresos: ', rowDataIngresos);

        for (const row of rowDataIngresos) {
            // Iterar sobre cada clave del objeto que representa la fila actual
            for (const key in row) {
                // if (!exclude.includes(key)) {
                if (include.includes(key)) {
                    // Si la clave no existe en el objeto que almacena el total de ingresos,
                    // se inicializa en cero
                    if (!this._totalPresupuestoIngresos[key]) {
                        this._totalPresupuestoIngresos[key] = 0;
                    }
                    // Se suma el valor de la clave al total
                    this._totalPresupuestoIngresos[key] += row[key];
                }
            }
        }
    }

    async calcPresupuestoGastos() {
        this._totalPresupuestoGastos = {};
        const include = ['Definitivas2023', 'Pagos2023'];
        console.log(
            'this._dataStoreService.dataTable.rowDataGastos: ',
            this._dataStoreService.dataTable.rowDataGastos
        );

        for (const row of this._dataStoreService.dataTable.rowDataGastos) {
            for (const key in row) {
                if (include.includes(key)) {
                    if (!this._totalPresupuestoGastos[key]) {
                        this._totalPresupuestoGastos[key] = 0;
                    }
                    this._totalPresupuestoGastos[key] += row[key];
                }
            }
        }
    }

    setTotalesPresupuesto() {
        console.log('this._totalPresupuestoIngresos: ', this._totalPresupuestoIngresos);
        console.log('this._totalPresupuestoGastos: ', this._totalPresupuestoGastos);

        try {
            const DataTotalesPresupuesto: IDataTotalesPresupuesto = {
                year: 2023,
                totalPresupuestoIngresos:
                    this._totalPresupuestoIngresos.Definitivas2023.toLocaleString(),
                totalEjecutadoIngresos:
                    this._totalPresupuestoIngresos.DerechosReconocidosNetos2023.toLocaleString(),
                totalPresupuestoGastos:
                    this._totalPresupuestoGastos.Definitivas2023.toLocaleString(),
                totalEjecutadoGastos: this._totalPresupuestoGastos.Pagos2023.toLocaleString(),
            };
            this._dataStoreService.dataTotalesPresupuesto = DataTotalesPresupuesto;
            console.log('DataTotalesPresupuesto: ', DataTotalesPresupuesto);
        } catch (error) {
            // console.clear();
            console.error('error------------------- ', error);
            console.log(this._totalPresupuestoIngresos);
            console.log(this._totalPresupuestoGastos);
        }
    }
}
