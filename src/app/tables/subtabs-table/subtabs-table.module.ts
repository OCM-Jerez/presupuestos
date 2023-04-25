import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';

import { SubtabsComponent } from './components/subtabs/subtabs.component';
import { TableGastosComponent } from './components/table/table.component';
import { GastosComponent } from './subtabs-table.component';

const routes: Routes = [{ path: '', component: GastosComponent }];
@NgModule({
    declarations: [GastosComponent, SubtabsComponent, TableGastosComponent],
    exports: [GastosComponent, SubtabsComponent, TableGastosComponent],

    imports: [CommonModule, AgGridModule, RouterModule.forChild(routes)],
})
export class GastosModule {}
