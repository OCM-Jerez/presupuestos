import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-card-edificio-singular',
	templateUrl: './card-edificio-singular.component.html',
	styleUrls: ['./card-edificio-singular.component.scss'],
	standalone: true
})
export default class CardEdificioSingularComponent {
	@Input() titulo: string;
	@Input() rutaImagen: string;
}
