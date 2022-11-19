import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetallePresupuestoComponent } from './detalle-presupuesto.component';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [{ path: '', component: DetallePresupuestoComponent }]

@NgModule({
  declarations: [
    DetallePresupuestoComponent
  ],
  imports: [RouterModule.forChild(routes), CommonModule, AgGridModule],
})
export class DetallePresupuestoModule { }
