import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetalleComponent } from './detalle/detalle.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ExplicamosComponent } from './explicamos/explicamos.component';
import { GlosarioComponent } from './glosario/glosario.component';
import { HomeComponent } from './home/home.component';
import { IndiceComponent } from './vision-global/vision-global.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'visionGlobal', component: IndiceComponent },
    { path: 'detallePresupuesto', component: DetalleComponent },
    { path: 'empleados', component: EmpleadosComponent },
    { path: 'explicamos', component: ExplicamosComponent },
    { path: 'glosario', component: GlosarioComponent },

    // {
    //     path: 'home',
    //     loadChildren: () => import('../app/home/home.component').then((m) => m.HomeComponent),
    // },
    // {
    //     path: 'detallePresupuesto',
    //     loadChildren: () => import('./detalle/detalle.component').then((m) => m.DetalleComponent),
    // },
    {
        path: 'tableAplicacionPresupuestaria',
        loadChildren: () =>
            import(
                './tables/table-gastos-aplicacion-presupuestaria/table-gastos-aplicacion-presupuestaria.component'
            ).then((m) => m.TableGastosAplicacionPresupuestariaComponent),
    },
    {
        path: 'tableGrupoProgramaDetails/:origen',
        loadChildren: () =>
            import('./tables/table-gastos-gruposprogramas-details/table-gastos-gruposprogramas-details.component').then(
                (m) => m.TableGastosGruposprogramasDetailsComponent
            ),
    },
    {
        path: 'tableProgramaDetails',
        loadChildren: () =>
            import('./tables/table-programa-details/table-programa-details.component').then(
                (m) => m.TableProgramaDetailsComponent
            ),
    },
    {
        path: 'graphIngresos',
        loadChildren: () =>
            import('./graphs/graph-ingresos/graph-ingresos.component').then((m) => m.GraphIngresosComponent),
    },
    {
        path: 'graphGastos',
        loadChildren: () => import('./graphs/graph-gastos/graph-gastos.component').then((m) => m.GraphGastosComponent),
    },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
