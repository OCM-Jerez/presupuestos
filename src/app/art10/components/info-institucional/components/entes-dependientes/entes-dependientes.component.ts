import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

// import { CardEnteComponent } from './components/card-ente/card-ente.component';
import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

import { INew } from '@interfaces/new.interface';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

interface IEnte {
	data: string;
	value: string;
	URL?: string;
}

@Component({
	selector: 'app-entes-dependientes',
	standalone: true,
	imports: [CommonModule, CardMenuComponent],
	templateUrl: './entes-dependientes.component.html',
	styleUrls: ['./entes-dependientes.component.scss']
})
export default class EntesDependientesComponent implements OnInit {
	private _router = inject(Router);
	private _location = inject(Location);
	private _route = inject(ActivatedRoute);
	private _http = inject(HttpClient);

	public data: IEnte[] = [];
	public news: INew[] = [];
	ngOnInit() {
		// Función auxiliar para gestionar suscripciones HTTP
		const fetchData = () => {
			const pathBase = '/assets/art10/infoInstitucional/entes';

			const data$ = this._http.get<IEnte[]>(`${pathBase}/entes.json`);
			const news$ = this._http.get<INew[]>(`${pathBase}/entesNews.json`);

			forkJoin({ data$, news$ }).subscribe(({ data$, news$ }) => {
				this.data = data$;
				this.news = news$;
			});
		};

		fetchData();
	}

	cardMenus = [
		this.createCard('Fundación Universitaria (Teatro Villamarta)', 'fundarte'),
		this.createCard('COMUJESA. Coporación Municipal de Jerez. S.A.', 'comujesa')
	];

	createCard(titulo: string, route: string) {
		this._location.go('/art10');

		return {
			titulo,
			rutaImagen: `assets/art10/infoInstitucional/entes/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/entesDependientes/${route}`),
			background: defaultBackground
		};
	}
}
