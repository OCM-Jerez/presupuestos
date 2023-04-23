import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';

import { ButtonClasificationComponent } from './components/subtabs/button-clasification.component';
import { TableGastosComponent } from './components/table-gastos/table-gastos.component';
import { GastosComponent } from './gastos.component';

const routes: Routes = [{ path: '', component: GastosComponent }];
@NgModule({
    declarations: [GastosComponent, ButtonClasificationComponent, TableGastosComponent],
    exports: [GastosComponent, ButtonClasificationComponent, TableGastosComponent],

    imports: [CommonModule, AgGridModule, RouterModule.forChild(routes)],
})
export class GastosModule {}
