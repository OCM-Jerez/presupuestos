import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-card-ente',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './card-ente.component.html',
	styleUrls: ['./card-ente.component.scss']
})
export class CardEnteComponent {
	@Input() titulo: string;
	@Input() rutaImagen: string;
}
