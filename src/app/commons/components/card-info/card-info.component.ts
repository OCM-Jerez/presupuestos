import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-card-info',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './card-info.component.html',
	styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent {
	@Input() rutaImagen: string;
	@Input() titulo: string;
	@Input() subtitulo: string;
	@Input() textButton: string;
	@Input() textButton1: string;
	@Input() textButton2: string;
	@Input() hover: true;
}
