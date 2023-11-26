import { Routes } from '@angular/router';

export default [
	// home =============================================================================================================================================
	{
		path: 'home',
		loadComponent: () => import('./home/home.component')
	},

	// level1 =============================================================================================================================================
	{
		path: 'level1/:path/:title',
		loadComponent: () => import('./level1/level1.component')
	},

	// level2 ============================================================================================================================================
	{
		path: 'level2/:path/:title',
		loadComponent: () => import('./level2/level2.component')
	},

	// {
	// 	path: 'infoInstitucional',
	// 	loadComponent: () => import('./level2/level2.component')
	// },
	// {
	// 	path: 'infoOrganizativa',
	// 	loadComponent: () => import('./level2/level2.component')
	// },
	// {
	// 	path: 'edificiosSingulares',
	// 	loadComponent: () => import('./level2/level2.component')
	// },

	// level3  ============================================================================================================================================
	{
		path: 'level3/:path/:title',
		loadComponent: () => import('./level3/level3.component')
		// loadComponent: () => import('./art10/components/info-institucional/components/comisiones/comisiones.component')
	},
	// {
	// 	path: 'plenos',
	// 	loadComponent: () => import('./level3/level3.component')
	// },
	{
		path: 'entes',
		loadComponent: () => import('./level3/level3.component')
	},
	{
		path: 'mesas',
		loadComponent: () => import('./level3/level3.component')
	},
	{
		path: 'elas',
		loadComponent: () => import('./level3/level3.component')
	},

	// level last ============================================================================================================================================
	// {
	// 	path: '',
	// 	loadComponent: () =>
	// 		import('./art10/components/info-organizativa/components/empleados/components/noticias/noticias.component')
	// },
	{
		path: 'empleadosNews',
		loadComponent: () =>
			import('./art10/components/info-organizativa/components/empleados/components/noticias/noticias.component')
		// loadComponent: () => import('./level-last/level-last.component')
	},
	// {
	// 	path: 'lastLevel',
	// 	loadComponent: () => import('./level-last/level-last.component')
	// },
	{
		path: 'plenos/:pleno',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'elas/:ela',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'comisiones/:comision',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'entes/:ente',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'mesas/:mesa',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'licitaciones/:licitacion',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'temas/:tema',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'distritos/:distrito',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'edificiosSingulares/:edificio',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'apartamentosTuristicos',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'proyectosViviendas',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'registroSolares',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'mercados',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'eventos/:evento',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'subvenciones/:subvencion',
		loadComponent: () => import('./level-last/level-last.component')
	},

	// Art 10 ============================================================================================================================================
	// {
	// 	path: 'comisiones',
	// 	loadComponent: () => import('./art10/components/info-institucional/components/comisiones/comisiones.component')
	// },
	{
		path: 'art10/empleados',
		loadComponent: () => import('./art10/components/info-organizativa/components/empleados/empleados.component')
	},
	{
		path: 'rpt',
		loadComponent: () =>
			import('./art10/components/info-organizativa/components/empleados/components/rpt/rpt.component')
	},
	{
		path: 'retribuciones2022',
		loadComponent: () =>
			import(
				'./art10/components/info-organizativa/components/empleados/components/retribuciones2022/retribuciones2022.component'
			)
	},

	// Art 15 ============================================================================================================================================
	{
		path: 'licitaciones',
		loadComponent: () => import('./art15/components/licitaciones/licitaciones.component')
	},
	{
		path: 'subvenciones',
		loadComponent: () => import('./art15/components/subvenciones/subvenciones.component')
	},

	// Art 16 ============================================================================================================================================
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
		path: 'fichaIndice',
		loadComponent: () =>
			import(
				'./art16/components/presupuestos/components/detalle/components/table-programa-details/components/ficha-indice/ficha-indice.component'
			)
	},
	{
		path: 'pmp',
		loadComponent: () => import('./art16/components/datos-economicos/components/pmp/pmp.component')
	},
	{
		path: 'impuestos',
		loadComponent: () => import('./art16/components/impuestos/impuestos.component')
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
		path: 'fichaNews',
		loadComponent: () =>
			'./art16/components/presupuestos/components/detalle/components/table-programa-details/components/ficha-news/ficha-news.component'
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
		path: 'graphDetalle',
		loadComponent: () =>
			import('./art16/components/presupuestos/components/detalle/components/graph-detalle/graph-detalle.component')
	},

	{
		path: 'fichaEmpleados',
		loadComponent: () =>
			import(
				'./art16/components/presupuestos/components/detalle/components/table-programa-details/components/ficha-personal/ficha-personal.component'
			)
	},
	{
		path: 'deuda/planAjuste20230918',
		loadComponent: () =>
			import('./art16/components/deuda/components/plan-ajuste/plan-ajuste20230918/plan-ajuste20230918.component')
	},

	//  ============================================================================================================================================
	{
		// path: 'barrios/:barrio',
		path: 'barrios',
		loadComponent: () => import('./distritos/components/distrito/components/barrio/barrio.component')
	},

	{
		path: 'explicamos',
		loadComponent: () => import('./explicamos/explicamos.component')
	},
	{
		path: 'glosario',
		loadComponent: () => import('./glosario/glosario.component')
	},

	// ============================================================================================================================================
	{ path: '**', pathMatch: 'full', redirectTo: '/home' }
] as Routes;
