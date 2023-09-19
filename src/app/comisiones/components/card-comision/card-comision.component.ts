import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-card-comision',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './card-comision.component.html',
	styleUrls: ['./card-comision.component.scss']
})
export class CardComisionComponent {
	@Input() titulo: string;
	// @Input() rutaImagen: string;
}
