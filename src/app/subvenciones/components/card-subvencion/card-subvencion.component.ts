import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-card-subvencion',
	standalone: true,
	templateUrl: './card-subvencion.component.html',
	styleUrls: ['./card-subvencion.component.scss']
})
export class CardSubvencionComponent {
	@Input() titulo: string;
	@Input() rutaImagen: string;
}
