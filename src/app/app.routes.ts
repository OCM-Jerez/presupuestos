import { Routes } from '@angular/router';

export default [
	{
		path: 'home',
		loadComponent: () => import('./home/home.component')
	},
	{
		path: 'art10',
		loadComponent: () => import('./art10/art10.component')
	},
	{
		path: 'art15',
		loadComponent: () => import('./art15/art15.component')
	},
	{
		path: 'art16',
		loadComponent: () => import('./art16/art16.component')
	},
	{
		path: 'presupuestos',
		loadComponent: () => import('./art16/components/presupuestos/presupuestos.component')
	},
	{
		path: 'visionGlobal',
		loadComponent: () => import('./art16/components/presupuestos/components/vision-global/vision-global.component')
	},
	{
		path: 'detalle',
		loadComponent: () => import('./art16/components/presupuestos/components/detalle/detalle.component')
	},
	{
		path: 'art10/plenos',
		loadComponent: () => import('./art10/components/info-institucional/components/plenos/plenos.component')
	},
	{
		path: 'pleno/:pleno',
		loadComponent: () =>
			import('./art10/components/info-institucional/components/plenos/components/pleno/pleno.component')
	},

	{
		path: 'fichaIndice',
		loadComponent: () =>
			import(
				'./art16/components/presupuestos/components/detalle/components/table-programa-details/components/ficha-indice/ficha-indice.component'
			)
	},
	{
		path: 'fichaPresupuesto',
		loadComponent: () =>
			'./art16/components/presupuestos/components/detalle/components/table-programa-details/components/ficha-presupuesto/ficha-presupuesto.component'
	},
	{
		path: 'fichaGastos',
		loadComponent: () =>
			'./art16/components/presupuestos/components/detalle/components/table-programa-details/components/ficha-gastos/ficha-gastos.component'
	},
	{
		path: 'fichaRemanentes',
		loadComponent: () =>
			import(
				'./art16/components/presupuestos/components/detalle/components/table-programa-details/components/ficha-remanentes-credito/ficha-remanentes-credito.component'
			)
	},
	{
		path: 'comisiones',
		loadComponent: () => import('./comisiones/comisiones.component')
	},
	{
		path: 'comision/:comision',
		loadComponent: () => import('./comisiones/components/comision/comision.component')
	},
	{
		path: 'deuda',
		loadComponent: () => import('./art16/components/deuda/deuda.component')
	},
	{
		path: 'deuda/deudaTotal',
		loadComponent: () => import('./art16/components/deuda/components/deudaTotal/deudaTotal.component')
	},
	{
		path: 'deuda/deudaViva',
		loadComponent: () => import('./art16/components/deuda/components/deuda-viva/deuda-viva.component')
	},
	{
		path: 'deuda/fondoOrdenacion',
		loadComponent: () => import('./art16/components/deuda/components/fondo-ordenacion/fondo-ordenacion.component')
	},
	{
		path: 'deuda/planAjuste',
		loadComponent: () => import('./art16/components/deuda/components/plan-ajuste/plan-ajuste.component')
	},
	{
		path: 'deuda/planAjuste20230918',
		loadComponent: () =>
			import('./art16/components/deuda/components/plan-ajuste/plan-ajuste20230918/plan-ajuste20230918.component')
	},
	{
		path: 'datosEconomicos',
		loadComponent: () => import('./art16/components/datos-economicos/datos-economicos.component')
	},
	{
		path: 'pmp',
		loadComponent: () => import('./art16/components/datos-economicos/components/pmp/pmp.component')
	},
	{
		path: 'fichaEmpleados',
		loadComponent: () =>
			import(
				'./art16/components/presupuestos/components/detalle/components/table-programa-details/components/ficha-personal/ficha-personal.component'
			)
	},
	{
		path: 'fichaNews/:codigo',
		loadComponent: () =>
			'./art16/components/presupuestos/components/detalle/components/table-programa-details/components/ficha-news/ficha-news.component'
	},
	{
		path: 'tableProgramaDetails/:origen',
		loadComponent: () =>
			import(
				'./art16/components/presupuestos/components/detalle/components/table-programa-details/table-programa-details.component'
			)
	},
	{
		path: 'licitaciones',
		loadComponent: () => import('./art15/components/licitaciones/licitaciones.component')
	},
	{
		path: 'licitacion/:licitacion',
		loadComponent: () => import('./art15/components/licitaciones/components/licitacion/licitacion.component')
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
		path: 'edificiosSingulares',
		loadComponent: () => import('./edificios-singulares/edificios-singulares.component')
	},
	{
		path: 'edificiosSingulares/:edificioSingular',
		loadComponent: () => import('./edificios-singulares/components/edificio-singular/edificio-singular.component')
	},
	{
		path: 'eventos',
		loadComponent: () => import('./eventos/eventos.component')
	},
	{
		path: 'eventos/:evento',
		loadComponent: () => import('./eventos/components/evento/evento.component')
	},
	{
		path: 'subvenciones',
		loadComponent: () => import('./art15/components/subvenciones/subvenciones.component')
	},
	{
		path: 'subvenciones/:subvencion',
		loadComponent: () => import('./art15/components/subvenciones/components/subvencion/subvencion.component')
	},
	{
		path: 'empleados',
		loadComponent: () => import('./empleados/empleados.component')
	},
	{
		path: 'graphDetalle',
		loadComponent: () =>
			import('./art16/components/presupuestos/components/detalle/components/graph-detalle/graph-detalle.component')
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
		path: 'empleadosNews',
		loadComponent: () => import('./empleados/components/noticias/noticias.component')
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
