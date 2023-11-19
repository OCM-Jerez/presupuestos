import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ICom } from '@interfaces/com.interface';

@Component({
	selector: 'app-comentarios',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './comentarios.component.html',
	styleUrls: ['./comentarios.component.scss']
})
export default class ComentariosComponent {
	@Input() coms: ICom[];
}
