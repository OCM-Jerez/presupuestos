import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';
import { forkJoin } from 'rxjs';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

interface IComision {
	data: string;
	value: string;
	URL?: string;
}

@Component({
	selector: 'app-comisiones',
	standalone: true,
	imports: [CommonModule, CardMenuComponent],
	templateUrl: './comisiones.component.html',
	styleUrls: ['./comisiones.component.scss']
})
export default class ComisionesComponent implements OnInit {
	private _router = inject(Router);
	private _location = inject(Location);
	private _http = inject(HttpClient);

	public data: IComision[] = [];
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public descripcion: string;

	ngOnInit() {
		// Función auxiliar para gestionar suscripciones HTTP
		const fetchData = () => {
			const pathBase = '/assets/art10/infoInstitucional/comisiones';

			const data$ = this._http.get<IComision[]>(`${pathBase}/comisiones.json`);
			const docs$ = this._http.get<IDoc[]>(`${pathBase}/comisionesDocs.json`);
			const news$ = this._http.get<INew[]>(`${pathBase}/comisionesNews.json`);
			const coms$ = this._http.get<ICom[]>(`${pathBase}/comisionesComs.json`);

			forkJoin({ data$, docs$, coms$, news$ }).subscribe(({ data$, docs$, coms$, news$ }) => {
				this.data = data$;
				this.docs = docs$;
				this.news = news$;
				this.coms = coms$;
			});

			const descripcionObj = this.data.find((obj) => obj.data === 'Descripción');
			if (descripcionObj) {
				this.descripcion = descripcionObj.value;
			}
		};

		fetchData();
	}

	comisionesPermanentes = [
		this.createCard(
			'Comisión de presidencia, centro histórico, fondos europeos, coordinación de gobierno y ordenación del territorio',
			'presidencia'
		),
		this.createCard(
			'Comisión de servicios públicos, desarrollo sostenible, medio ambiente, protección animal y participación ciudadana',
			'serviciosPublicos'
		),
		this.createCard('Comisión de inclusión social, familias, igualdad y diversidad y medio rural', 'inclusion'),
		this.createCard('Comisión de turismo, cultura, educación, deportes y juventud', 'turismo'),
		this.createCard(
			'Comisión de empleo, economía, patrimonio, seguridad, recursos humanos, simplificación administrativa y transparencia',
			'patrimonio'
		)
	];

	comisionesEspeciales = [
		this.createCard('Comisión especial de cuentas', 'cuentas'),
		this.createCard('Comisión especial de sugerencias y reclamaciones', 'sugerencias'),
		this.createCard('Comisión especial de capitalidad cultural', 'capitabilidad'),
		this.createCard('Comisión especial de presupuestos participativos', 'presupuestos'),
		this.createCard('Comisión especial de regeneración democrática y calidad institucional', 'regeneracion'),
		this.createCard('Comisión especial de impulso y seguimiento de las mesas sectoriales', 'impulso')
	];

	createCard(titulo: string, route: string) {
		// this._location.go('/comisiones');

		return {
			titulo,
			// rutaImagen: `assets/comisiones/${route}/${route}.jpg`,
			background: defaultBackground,
			funcion: () => this._router.navigateByUrl(`/comision/${route}`)
		};
	}
}
