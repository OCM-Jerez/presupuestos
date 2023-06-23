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
		path: 'fichaIndice',
		loadComponent: () =>
			import('./detalle/components/table-programa-details/components/ficha-indice/ficha-indice.component')
	},
	{
		path: 'fichaPresupuesto',
		loadComponent: () =>
			import('./detalle/components/table-programa-details/components/ficha-presupuesto/ficha-presupuesto.component')
	},
	{
		path: 'fichaGastos',
		loadComponent: () =>
			import('./detalle/components/table-programa-details/components/ficha-gastos/ficha-gastos.component')
	},
	{
		path: 'fichaEmpleados',
		loadComponent: () =>
			import('./detalle/components/table-programa-details/components/ficha-personal/ficha-personal.component')
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
