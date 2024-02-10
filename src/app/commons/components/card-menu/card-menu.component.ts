import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-card-menu',
	templateUrl: './card-menu.component.html',
	styleUrls: ['./card-menu.component.scss'],
	standalone: true,
	imports: []
})
export class CardMenuComponent {
	@Input() rutaImagen?: string;
	@Input() titulo: string;
	public errorCargaImagen = false;

	manejarErrorImagen() {
		this.errorCargaImagen = true;
	}
}
