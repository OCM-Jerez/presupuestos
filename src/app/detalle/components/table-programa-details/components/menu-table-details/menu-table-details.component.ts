import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

@Component({
	selector: 'app-menu-table-details',
	standalone: true,
	imports: [CommonModule, NgIf],
	templateUrl: './menu-table-details.component.html',
	styleUrls: ['./menu-table-details.component.scss']
})
export class MenuTableDetailsComponent {
	public showButtomExpanded = true;
	public isExpanded = true;
	public buttonExpandirColapsar = true;
	public hasAppPresupuestaria = true;
	public titleButtom = 'Para determinar el title del boton';

	_clicKButton() {
		console.log('click');
	}

	volver() {
		console.log('volver');
	}

	expandAll() {
		console.log('expandAll');
	}

	collapseAll() {
		console.log('collapseAll');
	}
}
