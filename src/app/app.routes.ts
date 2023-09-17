import { Routes } from '@angular/router';

export default [
	{
		path: 'home',
		loadComponent: () => import('./home/home.component')
	},
	{
		path: 'presupuestos',
		loadComponent: () => import('./presupuestos/presupuestos.component')
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
		path: 'fichaRemanentes',
		loadComponent: () =>
			import(
				'./detalle/components/table-programa-details/components/ficha-remanentes-credito/ficha-remanentes-credito.component'
			)
	},
	{
		path: 'deuda',
		loadComponent: () => import('./deuda/deuda.component')
	},
	{
		path: 'deuda/deudaTotal',
		loadComponent: () => import('./deuda/components/deudaTotal/deudaTotal.component')
	},
	{
		path: 'deuda/deudaViva',
		loadComponent: () => import('./deuda/components/deuda-viva/deuda-viva.component')
	},
	{
		path: 'fichaEmpleados',
		loadComponent: () =>
			import('./detalle/components/table-programa-details/components/ficha-personal/ficha-personal.component')
	},
	{
		path: 'fichaNews/:codigo',
		loadComponent: () =>
			import('./detalle/components/table-programa-details/components/ficha-news/ficha-news.component')
	},
	{
		path: 'tableProgramaDetails/:origen',
		loadComponent: () => import('./detalle/components/table-programa-details/table-programa-details.component')
	},
	{
		path: 'licitaciones',
		loadComponent: () => import('./licitaciones/licitaciones.component')
	},
	{
		path: 'licitacion/:licitacion',
		loadComponent: () => import('./licitaciones/components/licitacion/licitacion.component')
	},
	{
		path: 'entesDependientes',
		loadComponent: () => import('./entes-dependientes/entes-dependientes.component')
	},
	{
		path: 'entesDependientes/:ente',
		loadComponent: () => import('./entes-dependientes/components/ente/ente.component')
	},
	{
		path: 'temas',
		loadComponent: () => import('./temas/temas.component')
	},
	{
		path: 'temas/:tema',
		loadComponent: () => import('./temas/components/tema/tema.component')
	},
	{
		path: 'empleados',
		loadComponent: () => import('./empleados/empleados.component')
	},
	{
		path: 'graphDetalle',
		loadComponent: () => import('./detalle/components/graph-detalle/graph-detalle.component')
	},
	{
		path: 'rpt',
		loadComponent: () => import('./empleados/components/rpt/rpt.component')
	},
	{
		path: 'retribuciones2022',
		loadComponent: () => import('./empleados/components/retribuciones2022/retribuciones2022.component')
	},
	{
		path: 'explicamos',
		loadComponent: () => import('./explicamos/explicamos.component')
	},
	{
		path: 'glosario',
		loadComponent: () => import('./glosario/glosario.component')
	},
	{ path: '**', pathMatch: 'full', redirectTo: '/home' }
] as Routes;
