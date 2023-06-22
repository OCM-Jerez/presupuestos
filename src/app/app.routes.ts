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
		path: 'fichaPrograma',
		loadComponent: () => import('./detalle/components/table-programa-details/ficha-programa/ficha-programa.component')
	},
	{
		path: 'tableProgramaDetails/:origen',
		loadComponent: () => import('./detalle/components/table-programa-details/table-programa-details.component')
	},
	{
		path: 'empleados',
		loadComponent: () => import('./empleados/empleados.component')
	},
	{
		path: 'fichaPresupuesto',
		loadComponent: () =>
			import(
				'./detalle/components/table-programa-details/ficha-programa/components/ficha-presupuesto/ficha-presupuesto.component'
			)
	},
	{
		path: 'graphDetalle',
		loadComponent: () => import('./graphs/graph-detalle/graph-detalle.component')
	},
	{
		path: 'rpt',
		loadComponent: () => import('./empleados/components/rpt/rpt.component')
	},
	{
		path: 'retribuciones2022',
		loadComponent: () => import('./empleados/components/retribuciones2022/retribuciones2022.component')
	},
	{ path: '**', pathMatch: 'full', redirectTo: '/home' }
] as Routes;
