import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-card-evento',
	templateUrl: './card-evento.component.html',
	styleUrls: ['./card-evento.component.scss'],
	standalone: true
})
export default class CardEventoComponent {
	@Input() titulo: string;
	@Input() rutaImagen: string;
}
