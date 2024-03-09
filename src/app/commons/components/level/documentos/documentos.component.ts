import { Component, Input } from '@angular/core';
// import { IDoc } from '@interfaces/doc.interface';

@Component({
	selector: 'app-documentos',
	standalone: true,
	imports: [],
	templateUrl: './documentos.component.html',
	styleUrls: ['./documentos.component.scss']
})
export default class DocumentosComponent {
	// TODO: Typar
	@Input() docs: any[];
}
