import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';
import { SupabaseService } from '@app/organigrama/supabase/supabase.service';

interface INodeInfo {
	id: number;
	parentId?: number;
	name: string;
	nombre?: string;
	position?: string;
	salary?: any;
	image?: string;
	expanded?: boolean;
	puesto?: string;
	nombrePuesto?: string;
	situacionPuesto?: string;
	rpt_id?: string;
}

@Component({
	selector: 'app-d3-supabase',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './d3-supabase.component.html',
	styleUrls: ['./d3-supabase.component.scss']
})
export default class D3SupabaseComponent implements AfterViewInit {
	@ViewChild('chartContainer') private chartContainer: ElementRef;
	private _supabaseService = inject(SupabaseService);
	public positionData: any[] = null;

	formatter = new Intl.NumberFormat('de-DE', {
		style: 'decimal',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	});

	chart: OrgChart;
	data: INodeInfo[] = [];

	ngAfterViewInit() {
		// d3.json('assets/organigrama/organigrama.json').then((data: INodeInfo[]) => {
		// 	this.data = data;
		// 	this.initChart();
		// });
		this.fetchData();
	}

	async fetchData() {
		try {
			this.data = await this._supabaseService.fetchData('depende-eo');
			// Crear una promesa para cada elemento en this.data
			const promises = this.data.map(async (d) => {
				try {
					const nombre = await this._supabaseService.fetchDataByIdString('entidades_organizativas', String(d.id));
					d.nombre = nombre[0].nombre;

					// if (d.id === 233) {
					try {
						const puesto = await this._supabaseService.fetchDataByIdPuesto('puesto-eo', String(d.id));
						d.puesto = puesto[0].id_puesto;
					} catch (error) {
						console.error('Error al obtener el puesto:', error);
						d.puesto = 'Puesto no disponible'; // O manejar el error como prefieras
					}

					try {
						const nombrePuesto = await this._supabaseService.fetchDataByIdString('puestos', String(d.puesto));
						console.log('nombrePuesto', nombrePuesto);
						d.rpt_id = nombrePuesto[0].rpt_id;
						d.nombrePuesto = nombrePuesto[0].nombre;
						d.situacionPuesto = nombrePuesto[0].situacion;
					} catch (error) {
						console.error('Error al obtener el puesto:', error);
						d.puesto = 'Puesto no disponible'; // O manejar el error como prefieras
					}
					// }
				} catch (error) {
					console.error('Error al obtener el nombre:', error);
					d.nombre = 'Nombre no disponible'; // O manejar el error como prefieras
				}
			});

			// Esperar a que todas las promesas se resuelvan
			await Promise.all(promises);
			this.initChart();
			this.collapseServicios();
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	private initChart() {
		console.log('initChart');

		this.chart = new OrgChart()
			.childrenMargin(() => 50)
			.compact(false)
			.compactMarginBetween(() => 35)
			.compactMarginPair(() => 30)
			.container(this.chartContainer.nativeElement)
			.data(this.data)
			.initialExpandLevel(4)
			.initialZoom(0.7)
			.neighbourMargin((a, b) => 100)
			.nodeHeight(() => 300 + 25)
			.nodeWidth(() => 260 + 2)
			.nodeButtonWidth(() => 40) // Configure expand & collapse button width
			.nodeButtonHeight(() => 40) // Configure expand & collapse button height
			.nodeButtonX(() => -20) // Configure expand & collapse button x position
			.nodeButtonY(() => -20) // Configure expand & collapse button y position
			// .node.x(() => 20)
			.svgHeight(950)
			.svgWidth(600)
			.onNodeClick((d) => {
				window.location.href = `/#/supabase/${d.data.id}`;
			})
			.nodeContent((d) => {
				return this.createNodeHtml(d);
			})
			.render();
	}

	// TODO: Refactorizar
	createNodeHtml(d) {
		const paddingSize = 25 + 2;
		const nodeWidth = d.width - 2;
		const nodeHeight = d.height - paddingSize;
		const marginTop = -(paddingSize + 20);
		const borderStyle =
			d.data._highlighted || d.data._upToTheRootHighlighted ? '5px solid #E27396' : '2px solid #808080';

		// Estilos definidos como constantes
		const nodeContainerStyle = `width:${d.width}px; height:${d.height}px; padding-top:${paddingSize}px; padding-left:1px; padding-right:1px`;
		const nodeStyle = `font-family: 'Inter', sans-serif; margin-left:-1px; border-radius:10px; background-color:#FFFFFF; width:${nodeWidth}px; height:${nodeHeight}px; border: ${borderStyle}`;
		const idStyle = `font-size:15px; display:flex; justify-content:flex-end; margin-top:5px; margin-right:8px`;
		const nameStyle = `font-size:16px; color:#08011E; margin-left:20px; margin-top:10px`;

		// Aplicación de estilos a las líneas de enlaces
		d3.selectAll('.link').style('stroke', 'grey').style('stroke-width', '2px');

		return `
		<div style="${nodeContainerStyle}">
		  <div style="${nodeStyle}">
			<div style="${idStyle}">${this.formatter.format(d.data.id)}</div>
			<div style="${nameStyle}">${d.data.nombre}</div>
			<div style="${idStyle}">${d.data.puesto}</div>
			<div style="${nameStyle}">${d.data.rpt_id}</div>
			<div style="${nameStyle}">${d.data.nombrePuesto}</div>
			<div style="${nameStyle}">${d.data.situacionPuesto}</div>

			</div>
		</div>
	  `;
	}

	showConnections() {
		this.chart.connections([{ from: 100, to: 101, label: 'Delega en ' }]).render();
	}

	hideConnections() {
		this.chart.connections([{ from: 100, to: 1000, label: '' }], false).render();
		this.chart.setHighlighted(100);
	}

	collapseServicios() {
		this.chart.setExpanded(297, false);
		this.chart.setExpanded(290, false);
		this.chart.setExpanded(289, false);
		this.chart.setExpanded(301, false);
		this.chart.setExpanded(293, false);
		this.chart.setExpanded(298, false);
		this.chart.setExpanded(33, false);
		this.chart.setExpanded(34, false);
		this.chart.setExpanded(35, false);
		this.chart.setExpanded(304, false);
		this.chart.setExpanded(288, false);
		this.chart.setExpanded(287, false);
		this.chart.setExpanded(286, false);
		this.chart.setExpanded(284, false);
		this.chart.setExpanded(299, false);
		this.chart.setExpanded(296, false);
		this.chart.setExpanded(295, false);
		this.chart.setExpanded(300, false);
		this.chart.setExpanded(307, false);
		this.chart.setExpanded(306, false);
		this.chart.setExpanded(305, false);
		this.chart.setExpanded(283, false);
		this.chart.setExpanded(303, false);
		this.chart.setExpanded(291, false);
		this.chart.setExpanded(36, false);
		this.chart.setExpanded(294, false);
		this.chart.setExpanded(282).setCentered(282).render();
		this.chart.render();
	}

	expandDelegaciones() {
		this.chart.setExpanded(201);
		this.chart.setExpanded(203);
		this.chart.setExpanded(205);
		this.chart.setExpanded(208);
		this.chart.setExpanded(210);
		this.chart.setCentered(104);
		this.chart.initialZoom(0.6);
		// d3.selectAll('.node').style('border', '2px solid red');
		// this.chart.fit();
		this.chart.render();
	}

	collapseDelegaciones() {
		this.chart.setExpanded(201, false);
		this.chart.setExpanded(203, false);
		this.chart.setExpanded(205, false);
		this.chart.setExpanded(208, false);
		this.chart.setExpanded(210, false).setCentered(105).render();
	}

	zoomIn() {
		this.chart.zoomIn(1);
	}

	zoomOut() {
		this.chart.zoomOut(1);
	}

	searchNode(e, option: string) {
		const value = e.srcElement.value.toLowerCase();
		if (!value) {
			this.chart.clearHighlighting();
			return;
		}

		const data = this.chart.data();
		data.forEach((d) => {
			const content = d[option].toLowerCase();
			const isMatch = content.includes(value);
			d._highlighted = isMatch;
			d._expanded = isMatch;
		});

		this.chart.data(data).render().fit();
	}
}
