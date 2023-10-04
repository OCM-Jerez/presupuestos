import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { CardEnteComponent } from './components/card-ente/card-ente.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-entes-dependientes',
	standalone: true,
	imports: [CommonModule, CardEnteComponent],
	templateUrl: './entes-dependientes.component.html',
	styleUrls: ['./entes-dependientes.component.scss']
})
export default class EntesDependientesComponent {
	private _router = inject(Router);
	private _location = inject(Location);

	cardMenus = [this.createCard('Fundación Universitaria (Teatro Villamarta)', 'fundarte')];

	createCard(titulo: string, route: string) {
		this._location.go('/art10');

		return {
			titulo,
			rutaImagen: `assets/entes/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/entesDependientes/${route}`),
			background: defaultBackground
		};
	}
}
