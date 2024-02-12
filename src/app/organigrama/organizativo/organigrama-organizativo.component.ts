import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';

import { environment } from '@environments/environment';

import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';

import { SupabaseService } from '@services/supabase.service';

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
	selector: 'app-organigrama-organizativo',
	standalone: true,
	imports: [],
	templateUrl: './organigrama-organizativo.component.html',
	styleUrls: ['./organigrama-organizativo.component.scss']
})
export default class OrganigramaOrganizativoComponent implements AfterViewInit {
	@ViewChild('chartContainer') private chartContainer: ElementRef;
	private _supabaseService = inject(SupabaseService);
	private _canViewDatos = environment.canAddRowSupabase;

	formatter = new Intl.NumberFormat('de-DE', {
		style: 'decimal',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	});

	formatSalary(salarioTotal: string): string {
		const num = parseFloat(salarioTotal);

		if (isNaN(num)) {
			return 'Sin dato salario';
		}

		const formatter = new Intl.NumberFormat('de-DE', {
			style: 'decimal',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		});

		return formatter.format(num) + ' €';
	}

	chart: OrgChart;
	data: INodeInfo[] = [];

	ngAfterViewInit() {
		this.fetchData();
	}

	async fetchData() {
		try {
			this.data = await this._supabaseService.fetchData('datos_organigrama1');
			// Asumiendo que 'data' es un array de tipo INodeInfo[]
			if (this.data && Array.isArray(this.data)) {
				await this.initChart();
				// await this.collapseServicios();
			} else {
				console.error('No se recibieron datos.');
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	async initChart() {
		this.chart = new OrgChart()
			.childrenMargin(() => 50)
			.compact(false)
			.compactMarginBetween(() => 35)
			.compactMarginPair(() => 30)
			.container(this.chartContainer.nativeElement)
			.data(this.data)
			.initialExpandLevel(6)
			.initialZoom(0.6)
			.neighbourMargin((a, b) => 100)
			.nodeHeight(() => 300 + 25)
			.nodeWidth(() => 260 + 2)
			.nodeButtonWidth(() => 40)
			.nodeButtonHeight(() => 40)
			.nodeButtonX(() => -20)
			.nodeButtonY(() => -20)
			.svgHeight(750)
			.svgWidth(600)
			.onNodeClick((d) => {
				// alert(`/#/datos/${d.data.id}`);
				if (this._canViewDatos) {
					window.location.href = `/#/datos/${d.data.id}`;
				}
			})
			.nodeContent((d) => {
				// if (d.data.id === 294) {
				// console.log(d.data);
				// 	console.log( parseFloat(d.data.salario_total));
				// console.log(this.formatter.format(parseFloat(d.data.salario_total)));
				// }

				// if (d.data.salario_total === null) {
				// 	d.data.salario_total = 'Sin dato salario';
				// }
				return this.createNodeHtml(d);
			})
			.render();
		// .node.x(() => 20)
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
		const salaryStyle = `font-size:18px; color: red; display:flex; justify-content:flex-end; margin-top:5px; margin-right:8px`;
		const nodeStyle = `font-family: 'Inter', sans-serif; margin-left:-1px; border-radius:10px; background-color:#FFFFFF; width:${nodeWidth}px; height:${nodeHeight}px; border: ${borderStyle}`;
		const idStyle = `font-size:15px; display:flex; justify-content:flex-end; margin-top:5px; margin-right:8px`;
		const nameStyle = `font-size:16px; color:#08011E; margin-left:20px; margin-top:10px`;

		// Aplicación de estilos a las líneas de enlaces
		d3.selectAll('.link').style('stroke', 'grey').style('stroke-width', '2px');

		d.data.id_puesto = d.data.id_puesto ? d.data.id_puesto : '';
		d.data.rpt_id = d.data.rpt_id ? d.data.rpt_id : '';
		d.data.nombre_puesto = d.data.nombre_puesto ? d.data.nombre_puesto : '';
		d.data.situacion_puesto = d.data.situacion_puesto ? d.data.situacion_puesto : '';
		!Number.isNaN(d.data.salario_total) ? d.data.salario_total : 'sin dato';

		return `
		<div style="${nodeContainerStyle}">
		  <div style="${nodeStyle}">
			<div style="${idStyle}">${this.formatter.format(d.data.id)}</div>
			<div style="${nameStyle}">${d.data.nombre_entidad}</div>
			<div style="${idStyle}">${d.data.id_puesto}</div>
			<div style="${nameStyle}">${d.data.rpt_id}</div>
			<div style="${nameStyle}">${d.data.nombre_puesto}</div>
			<div style="${salaryStyle}">${this.formatSalary(d.data.salario_total)}</div>
			<div style="${nameStyle}">${d.data.situacion_puesto}</div>
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

	async collapseServicios() {
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

	zoomIn() {
		this.chart.zoomIn(1);
	}

	zoomOut() {
		this.chart.zoomOut(1);
	}

	searchNode(e) {
		const value = e.srcElement.value.toLowerCase();
		if (!value) {
			this.chart.clearHighlighting();
			return;
		}

		const data = this.chart.data();
		data.forEach((d) => {
			const content = d.nombre_entidad.toLowerCase();
			const isMatch = content.includes(value);
			d._highlighted = isMatch;
			d._expanded = isMatch;
		});

		this.chart.data(data).render().fit();
	}

	searchRPT(e) {
		const value = e.srcElement.value.toLowerCase();
		let isMatch = false; // Iniciar isMatch como false
		if (!value) {
			this.chart.clearHighlighting();
			return;
		}

		const data = this.chart.data();
		data.forEach((d) => {
			const content = d.rpt_id.toLowerCase();
			if (content.includes(value)) {
				isMatch = true; // Actualizar isMatch si se encuentra una coincidencia
				d._highlighted = true;
				d._expanded = true;
			} else {
				d._highlighted = false;
				d._expanded = false;
			}
		});

		if (!isMatch) {
			this.chart.clearHighlighting();
			setTimeout(() => {
				alert('No se ha encontrado el RPT: ' + value);
			}, 0);
		} else {
			this.chart.data(data).render().fit();
		}

		// this.chart.data(data).render().fit();
	}
}
