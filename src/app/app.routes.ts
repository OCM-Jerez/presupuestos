import { Routes } from '@angular/router';

export default [
	{
		path: 'home',
		loadComponent: () => import('./home/home.component')
	},
	{
		path: 'level1',
		loadComponent: () => import('./level1/level1.component')
	},
	// {
	// 	path: 'infoIntitucional',
	// 	loadComponent: () => import('./art10/components/info-institucional/info-institucional.component')
	// },
	// {
	// 	path: 'infoOrganizativa',
	// 	loadComponent: () => import('./art10/components/info-organizativa/info-organizativa.component')
	// },
	{
		path: 'infoIntitucional',
		loadComponent: () => import('./level2/level2.component')
	},
	{
		path: 'infoOrganizativa',
		loadComponent: () => import('./level2/level2.component')
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
		path: 'plenos',
		loadComponent: () => import('./art10/components/info-institucional/components/plenos/plenos.component')
	},
	// {
	// 	path: 'pleno/:pleno',
	// 	loadComponent: () =>
	// 		import('./art10/components/info-institucional/components/plenos/components/pleno/pleno.component')
	// },
	{
		path: 'pleno/:pleno',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'elas',
		loadComponent: () => import('./art10/components/info-institucional/components/elas/elas.component')
	},
	// {
	// 	path: 'ela/:ela',
	// 	loadComponent: () => import('./art10/components/info-institucional/components/elas/components/ela/ela.component')
	// },
	{
		path: 'ela/:ela',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'comisiones',
		loadComponent: () => import('./art10/components/info-institucional/components/comisiones/comisiones.component')
	},
	// {
	// 	path: 'comision/:comision',
	// 	loadComponent: () =>
	// 		import('./art10/components/info-institucional/components/comisiones/components/comision/comision.component')
	// },
	{
		path: 'comision/:comision',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'entesDependientes',
		loadComponent: () =>
			import('./art10/components/info-institucional/components/entes-dependientes/entes-dependientes.component')
	},
	{
		path: 'entesDependientes/:ente',
		loadComponent: () =>
			import('./art10/components/info-institucional/components/entes-dependientes/components/ente/ente.component')
	},
	{
		path: 'mesas',
		loadComponent: () => import('./art10/components/info-institucional/components/mesas/mesas.component')
	},
	// {
	// 	path: 'mesas/:mesa',
	// 	loadComponent: () => import('./art10/components/info-institucional/components/mesas/components/mesa/mesa.component')
	// },
	{
		path: 'mesas/:mesa',
		loadComponent: () => import('./level-last/level-last.component')
	},

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
	{
		path: 'empleadosNews',
		loadComponent: () =>
			import('./art10/components/info-organizativa/components/empleados/components/noticias/noticias.component')
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
	// {
	// 	path: 'datosEconomicos',
	// 	loadComponent: () => import('./art16/components/datos-economicos/datos-economicos.component')
	// },
	{
		path: 'pmp',
		loadComponent: () => import('./art16/components/datos-economicos/components/pmp/pmp.component')
	},
	{
		path: 'impuestos',
		loadComponent: () => import('./art16/components/impuestos/impuestos.component')
	},
	{
		path: 'fichaEmpleados',
		loadComponent: () =>
			import(
				'./art16/components/presupuestos/components/detalle/components/table-programa-details/components/ficha-personal/ficha-personal.component'
			)
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
	// {
	// 	path: 'licitacion/:licitacion',
	// 	loadComponent: () => import('./art15/components/licitaciones/components/licitacion/licitacion.component')
	// },
	{
		path: 'licitaciones/:licitacion',
		loadComponent: () => import('./level-last/level-last.component')
	},
	// {
	// 	path: 'temas/:tema',
	// 	loadComponent: () => import('./temas/components/tema/tema.component')
	// },
	{
		path: 'temas/:tema',
		loadComponent: () => import('./level-last/level-last.component')
	},
	// {
	// 	path: 'distritos/:distrito',
	// 	loadComponent: () => import('./distritos/components/distrito/distrito.component')
	// },
	{
		path: 'distritos/:distrito',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		// path: 'barrios/:barrio',
		path: 'barrios',
		loadComponent: () => import('./distritos/components/distrito/components/barrio/barrio.component')
	},
	{
		path: 'edificiosSingulares',
		loadComponent: () => import('./medioambiental/components/edificios-singulares/edificios-singulares.component')
	},
	// {
	// 	path: 'edificiosSingulares/:edificioSingular',
	// 	loadComponent: () =>
	// 		import(
	// 			'./medioambiental/components/edificios-singulares/components/edificio-singular/edificio-singular.component'
	// 		)
	// },
	{
		path: 'edificiosSingulares/:edificioSingular',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'apartamentosTuristicos',
		loadComponent: () => import('./medioambiental/components/apartamentos-turisticos/apartamentos-turisticos.component')
	},
	{
		path: 'proyectosViviendas',
		loadComponent: () => import('./medioambiental/components/proyectos-viviendas/proyectos-viviendas.component')
	},
	// {
	// 	path: 'eventos/:evento',
	// 	loadComponent: () => import('./eventos/components/evento/evento.component')
	// },
	{
		path: 'eventos/:evento',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'subvenciones',
		loadComponent: () => import('./art15/components/subvenciones/subvenciones.component')
	},
	// {
	// 	path: 'subvenciones/:subvencion',
	// 	loadComponent: () => import('./art15/components/subvenciones/components/subvencion/subvencion.component')
	// },
	{
		path: 'subvenciones/:subvencion',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'graphDetalle',
		loadComponent: () =>
			import('./art16/components/presupuestos/components/detalle/components/graph-detalle/graph-detalle.component')
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
