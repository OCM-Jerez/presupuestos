import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-card-licitacion',
	templateUrl: './card-licitacion.component.html',
	styleUrls: ['./card-licitacion.component.scss'],
	standalone: true
})
export class CardLicitacionComponent {
	@Input() titulo: string;
	@Input() rutaImagen: string;
}
