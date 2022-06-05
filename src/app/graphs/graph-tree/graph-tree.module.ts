import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';
import { AgChartsAngularModule } from 'ag-charts-angular';

import { GraphTreeComponent } from './graph-tree.component';

export const routes: Routes = [{ path: '', component: GraphTreeComponent }]
@NgModule({
    declarations: [GraphTreeComponent],
    imports: [RouterModule.forChild(routes), CommonModule, AgGridModule, AgChartsAngularModule],
})
export class GraphTreeModule { }
