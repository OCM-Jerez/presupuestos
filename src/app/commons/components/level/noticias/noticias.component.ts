import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-noticias',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './noticias.component.html'
})
export default class NoticiasComponent {
	@Input() news: any[];
}
