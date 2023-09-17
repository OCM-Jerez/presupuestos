import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-card-deuda',
	templateUrl: './card-deuda.component.html',
	styleUrls: ['./card-deuda.component.scss'],
	standalone: true
})
export class CardDeudaComponent {
	@Input() titulo: string;
	@Input() rutaImagen: string;
}
