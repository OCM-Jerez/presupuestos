import { Routes } from '@angular/router';

export default [
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
		path: 'tableProgramaDetails/:origen',
		loadComponent: () => import('./tables/table-programa-details/table-programa-details.component')
	},
	{
		path: 'tableGrupoProgramaDetails/:origen',
		loadComponent: () =>
			import('./tables/table-gastos-gruposprogramas-details/table-gastos-gruposprogramas-details.component')
	},
	{
		path: 'tableAplicacionPresupuestaria',
		loadComponent: () =>
			import('./tables/table-gastos-aplicacion-presupuestaria/table-gastos-aplicacion-presupuestaria.component')
	},
	{
		path: 'rpt',
		loadComponent: () => import('./empleados/components/rpt/rpt.component')
	},
	{
		path: 'retribuciones2022',
		loadComponent: () => import('./empleados/components/retribuciones2022/retribuciones2022.component')
	},
	{ path: '**', pathMatch: 'full', redirectTo: 'home' }
] as Routes;
