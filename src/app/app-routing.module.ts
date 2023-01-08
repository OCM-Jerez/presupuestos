import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetallePresupuestoComponent } from './detalle-presupuesto/detalle-presupuesto.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ExplicamosComponent } from './explicamos/explicamos.component';
import { GlosarioComponent } from './glosario/glosario.component';
import { HomeComponent } from './home/home.component';

import { IndiceComponent } from './indice/indice.component';

const routes: Routes = [
  { path: 'home', component: IndiceComponent },

  { path: 'homeNew', component: HomeComponent },
  { path: 'detallePresupuesto', component: DetallePresupuestoComponent },
  // { path: 'detallePresupuesto', loadChildren: () => import('./detalle-presupuesto/detalle-presupuesto.module').then((m) => m.DetallePresupuestoModule) },

  { path: 'explicamos', component: ExplicamosComponent },
  { path: 'glosario', component: GlosarioComponent },

  { path: 'empleados', component: EmpleadosComponent },


  { path: 'tableIngresos', loadChildren: () => import('./tables/table-ingresos/table-ingresos.module').then((m) => m.TableIngresosModule) },

  { path: 'tableGastos', loadChildren: () => import('./tables/table-gastos/table-gastos.module').then((m) => m.TableGastosModule) },
  { path: 'newGastos', loadChildren: () => import('./tables/gastos/gastos.module').then((m) => m.GastosModule) },

  { path: 'tableAplicacionPresupuestaria', loadChildren: () => import('./tables/table-gastos-aplicacion-presupuestaria/table-gastos-aplicacion-presupuestaria.module').then((m) => m.TableGastosAplicacionPresupuestariaModule) },

  { path: 'tableOrganicoDetails', loadChildren: () => import('./tables/table-gastos-organicos-details/table-gastos-organicos-details.module').then((m) => m.TableGastosOrganicosDetailsModule) },

  { path: 'tableAreaDetails', loadChildren: () => import('./tables/table-gastos-areas-details/table-gastos-areas-details.module').then((m) => m.TableGastosAreasDetailsModule) },
  { path: 'tablePoliticaDetails', loadChildren: () => import('./tables/table-gastos-politicas-details/table-gastos-politicas-details.module').then((m) => m.TableGastosPoliticasDetailsModule) },
  { path: 'tableGrupoProgramaDetails', loadChildren: () => import('./tables/table-gastos-gruposprogramas-details/table-gastos-gruposprogramas-details.module').then((m) => m.TableGastosGruposprogramasDetailsModule) },
  { path: 'tableProgramaDetails', loadChildren: () => import('./tables/table-programa-details/table-programa-details.module').then((m) => m.TableProgramaDetailsModule) },

  { path: 'tableCapituloDetails', loadChildren: () => import('./tables/table-gastos-capitulos-details/table-gastos-capitulos-details.module').then((m) => m.TableGastosCapitulosDetailsModule) },
  { path: 'tableArticuloDetails', loadChildren: () => import('./tables/table-gastos-articulos-details/table-gastos-articulos-details.module').then((m) => m.TableGastosArticulosDetailsModule) },
  { path: 'tableConceptoDetails', loadChildren: () => import('./tables/table-gastos-conceptos-details/table-gastos-conceptos-details.module').then((m) => m.TableGastosConceptosDetailsModule) },
  { path: 'tableEconomicoDetails', loadChildren: () => import('./tables/table-economico-details/table-economico-details.module').then((m) => m.TableEconomicoDetailsModule) },

  { path: 'graphIngresos', loadChildren: () => import('./graphs/graph-ingresos/graph-ingresos.module').then((m) => m.GraphIngresosModule) },
  { path: 'graphGastos', loadChildren: () => import('./graphs/graph-gastos/graph-gastos.module').then((m) => m.GraphGastosModule) },
  { path: 'graphTree', loadChildren: () => import('./graphs/graph-tree/graph-tree.module').then((m) => m.GraphTreeModule) },
  { path: '**', pathMatch: 'full', redirectTo: 'homeNew' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }