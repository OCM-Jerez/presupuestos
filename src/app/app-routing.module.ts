import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent)
      },
      {
        path: 'visionGlobal',
        loadComponent: () => import('./vision-global/vision-global.component').then((m) => m.IndiceComponent)
      },
      {
        path: 'detallePresupuesto',
        loadComponent: () => import('./detalle/detalle.component').then((m) => m.DetalleComponent)
      },
      {
        path: 'empleados',
        loadComponent: () => import('./empleados/empleados.component').then((m) => m.EmpleadosComponent)
      },
      {
        path: 'explicamos',
        loadComponent: () => import('./explicamos/explicamos.component').then((m) => m.ExplicamosComponent)
      },
      {
        path: 'glosario',
        loadComponent: () => import('./glosario/glosario.component').then((m) => m.GlosarioComponent)
      },
      {
        path: 'graphIngresos',
        loadComponent: () =>
          import('./graphs/graph-ingresos/graph-ingresos.component').then((m) => m.GraphIngresosComponent)
      },
      {
        path: 'graphGastos',
        loadComponent: () => import('./graphs/graph-gastos/graph-gastos.component').then((m) => m.GraphGastosComponent)
      },

      { path: '**', pathMatch: 'full', redirectTo: 'home' }
    ]
  }
];

//     {
//         path: 'tableAplicacionPresupuestaria',
//         loadChildren: () =>
//             import(
//                 './tables/table-gastos-aplicacion-presupuestaria/table-gastos-aplicacion-presupuestaria.component'
//             ).then((m) => m.TableGastosAplicacionPresupuestariaComponent),
//     },
//     {
//         path: 'tableGrupoProgramaDetails/:origen',
//         loadChildren: () =>
//             import('./tables/table-gastos-gruposprogramas-details/table-gastos-gruposprogramas-details.component').then(
//                 (m) => m.TableGastosGruposprogramasDetailsComponent
//             ),
//     },
//     {
//         path: 'tableProgramaDetails',
//         loadChildren: () =>
//             import('./tables/table-programa-details/table-programa-details.component').then(
//                 (m) => m.TableProgramaDetailsComponent
//             ),
//     },

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
