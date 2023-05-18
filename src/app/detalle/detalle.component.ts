import { Component } from '@angular/core';

import { CheckboxComponent } from '../commons/components/checkbox/checkbox.component';
import { SubtabsComponent } from './components/subtabs/subtabs.component';
import { TablePresupuestoComponent } from './components/table-presupuesto/table-presupuesto.component';
import { TableComponent } from './components/table/table.component';
import { TabComponent } from './components/tabs/tab/tab.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TreemapComponent } from './components/treemap/treemap.component';

import { ITab } from '@interfaces/tab.interface';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  standalone: true,
  imports: [
    CheckboxComponent,
    SubtabsComponent,
    TabComponent,
    TableComponent,
    TablePresupuestoComponent,
    TabsComponent,
    TreemapComponent
  ]
})
export class DetalleComponent {
  // eslint-disable-next-line prettier/prettier
  public tabs: ITab[] = [
    { clasificationType: 'ingresosEconomicaEconomicos', title: 'Ingresos', selected: true },
    { clasificationType: 'gastosProgramaProgramas', title: '¿En qué se gasta?', selected: false },
    { clasificationType: 'gastosOrganicaOrganicos', title: '¿Quién lo gasta?', selected: false },
    { clasificationType: 'gastosEconomicaEconomicos', title: '¿Para qué se gasta?', selected: false }
  ];

  async hasChangeCheckbox() {
    // await this._tableService.loadData(this._typeClasification);
  }
}
