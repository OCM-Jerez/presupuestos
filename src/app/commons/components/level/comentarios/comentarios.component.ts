
import { Component, Input } from '@angular/core';

// import { ICom } from '@interfaces/com.interface';

@Component({
	selector: 'app-comentarios',
	standalone: true,
	imports: [],
	templateUrl: './comentarios.component.html',
	styleUrls: ['./comentarios.component.scss']
})
export default class ComentariosComponent {
	// TODO: Typar
	@Input() coms: any[];
}
