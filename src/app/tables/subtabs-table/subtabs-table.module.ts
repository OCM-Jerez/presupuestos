import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';

import { GastosComponent } from './subtabs-table.component';

const routes: Routes = [{ path: '', component: GastosComponent }];
@NgModule({
    // declarations: [GastosComponent, SubtabsComponent, TableComponent],
    declarations: [GastosComponent],

    //    exports: [GastosComponent, SubtabsComponent, TableComponent],
    exports: [GastosComponent],

    imports: [CommonModule, AgGridModule, RouterModule.forChild(routes)],
})
export class SubtabsTableModule {}
