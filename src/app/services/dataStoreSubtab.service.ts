import { Injectable } from '@angular/core';
import { ISubtabClasification } from '@interfaces/subtabClasification.interface';

@Injectable({
  providedIn: 'root'
})
export class DataStoreSubtabService {
  private data1: ISubtabClasification = {
    clasificationType: 'ingresosEconomicaEconomicos',
    codField: 'CodEco',
    desField: 'DesEco',
    key: 'ingresosEconomicaEconomicos',
    name: 'Por económico',
    selected: true
  };
  private data2: ISubtabClasification = {
    clasificationType: 'gastosProgramaProgramas',
    codField: 'CodPro',
    desField: 'DesPro',
    key: 'gastosProgramaProgramas',
    name: 'Por programa',
    selected: true
  };
  private data3: ISubtabClasification = {
    clasificationType: 'gastosOrganicaOrganicos',
    codField: 'CodOrg',
    desField: 'DesOrg',
    key: 'gastosOrganicaOrganicos',
    name: 'Orgánico',
    selected: true
  };
  private data4: ISubtabClasification = {
    clasificationType: 'gastosEconomicaEconomicos',
    codField: 'CodEco',
    desField: 'DesEco',
    key: 'gastosEconomicaEconomicos',
    name: 'Económico',
    selected: true
  };

  setData1(data1: ISubtabClasification): void {
    this.data1 = data1;
  }

  getData1(): ISubtabClasification {
    return this.data1;
  }

  setData2(data2: ISubtabClasification): void {
    this.data2 = data2;
  }

  getData2(): ISubtabClasification {
    return this.data2;
  }

  setData3(data3: ISubtabClasification): void {
    this.data3 = data3;
  }

  getData3(): ISubtabClasification {
    return this.data3;
  }

  setData4(data4: ISubtabClasification): void {
    this.data4 = data4;
  }

  getData4(): ISubtabClasification {
    return this.data4;
  }
}
