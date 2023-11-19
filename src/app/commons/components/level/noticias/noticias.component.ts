import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { INew } from '@interfaces/new.interface';

@Component({
	selector: 'app-noticias',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './noticias.component.html',
	styleUrls: ['./noticias.component.scss']
})
export default class NoticiasComponent {
	@Input() news: INew[];
}
