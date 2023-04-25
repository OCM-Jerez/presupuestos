import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';

import { SubtabsComponent } from './components/subtabs/subtabs.component';
import { TableComponent } from './components/table/table.component';
import { GastosComponent } from './subtabs-table.component';

const routes: Routes = [{ path: '', component: GastosComponent }];
@NgModule({
    declarations: [GastosComponent, SubtabsComponent, TableComponent],
    exports: [GastosComponent, SubtabsComponent, TableComponent],

    imports: [CommonModule, AgGridModule, RouterModule.forChild(routes)],
})
export class SubtabsTableModule {}
