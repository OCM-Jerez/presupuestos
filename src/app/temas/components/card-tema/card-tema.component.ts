import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-card-tema',
	templateUrl: './card-tema.component.html',
	styleUrls: ['./card-tema.component.scss'],
	standalone: true
})
export default class CardTemaComponent {
	@Input() titulo: string;
	@Input() rutaImagen: string;
}
