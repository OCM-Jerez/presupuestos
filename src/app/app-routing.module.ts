import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetalleComponent } from './detalle/detalle.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ExplicamosComponent } from './explicamos/explicamos.component';
import { GlosarioComponent } from './glosario/glosario.component';
import { HomeComponent } from './home/home.component';
import { IndiceComponent } from './indice/indice.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'visionGlobal', component: IndiceComponent },
    { path: 'detallePresupuesto', component: DetalleComponent },
    // {
    //     path: 'detallePresupuesto',
    //     loadChildren: () => import('./detalle/detalle.module').then((m) => m.DetallePresupuestoModule),
    // },
    { path: 'empleados', component: EmpleadosComponent },
    { path: 'explicamos', component: ExplicamosComponent },
    { path: 'glosario', component: GlosarioComponent },
    {
        path: 'home',
        loadChildren: () => import('../app/home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'tableIngresos',
        loadChildren: () => import('./tables/table-ingresos/table-ingresos.module').then((m) => m.TableIngresosModule),
    },
    {
        path: 'tableAplicacionPresupuestaria',
        loadChildren: () =>
            import(
                './tables/table-gastos-aplicacion-presupuestaria/table-gastos-aplicacion-presupuestaria.module'
            ).then((m) => m.TableGastosAplicacionPresupuestariaModule),
    },
    {
        // tableGrupoProgramaDetails/?origen=ingresos&&id=1
        // tableGrupoProgramaDetails
        path: 'tableGrupoProgramaDetails/:origen',
        loadChildren: () =>
            import('./tables/table-gastos-gruposprogramas-details/table-gastos-gruposprogramas-details.module').then(
                (m) => m.TableGastosGruposprogramasDetailsModule
            ),
    },
    {
        path: 'tableProgramaDetails',
        loadChildren: () =>
            import('./tables/table-programa-details/table-programa-details.module').then(
                (m) => m.TableProgramaDetailsModule
            ),
    },
    {
        path: 'graphIngresos',
        loadChildren: () => import('./graphs/graph-ingresos/graph-ingresos.module').then((m) => m.GraphIngresosModule),
    },
    {
        path: 'graphGastos',
        loadChildren: () => import('./graphs/graph-gastos/graph-gastos.module').then((m) => m.GraphGastosModule),
    },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
