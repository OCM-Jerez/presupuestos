import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	// {
	// path: '',
	// children: [
	{
		path: 'home',
		loadComponent: () => import('./home/home.component')
	},
	{
		path: 'visionGlobal',
		loadComponent: () => import('./vision-global/vision-global.component')
	},
	{
		path: 'detalle',
		loadComponent: () => import('./detalle/detalle.component')
	},
	{
		path: 'empleados',
		loadComponent: () => import('./empleados/empleados.component')
	},
	{
		path: 'explicamos',
		loadComponent: () => import('./explicamos/explicamos.component')
	},
	{
		path: 'glosario',
		loadComponent: () => import('./glosario/glosario.component')
	},
	{
		path: 'graphDetalle',
		loadComponent: () => import('./graphs/graph-detalle/graph-detalle.component')
	},
	{
		path: 'tableProgramaDetails',
		loadComponent: () => import('./tables/table-programa-details/table-programa-details.component')
	},
	{
		path: 'tableGrupoProgramaDetails/:origen',
		loadComponent: () =>
			import('./tables/table-gastos-gruposprogramas-details/table-gastos-gruposprogramas-details.component')
	},
	{ path: '**', pathMatch: 'full', redirectTo: 'home' }
	// ]
	// }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
