import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { TabComponent } from '@app/commons/components/tabs/tab/tab.component';
import { TabsComponent } from '@app/commons/components/tabs/tabs.component';

@Component({
	selector: 'app-ficha-programa',
	standalone: true,
	imports: [TabComponent, TabsComponent, NgFor, NgIf],
	templateUrl: './ficha-programa.component.html',
	styleUrls: ['./ficha-programa.component.scss']
})
export default class FichaProgramaComponent {
	public tabs: { title: string; selected: boolean; isFicha: boolean }[] = [
		{ title: 'Presupuesto', selected: true, isFicha: true },
		{ title: 'Personal', selected: false, isFicha: true },
		{ title: 'Carta de servicios', selected: false, isFicha: true },
		{ title: 'Indicadores', selected: false, isFicha: true },
		{ title: 'Hemeroteca', selected: false, isFicha: true },
		{ title: 'Documentos', selected: false, isFicha: true },
		{ title: 'Licitaciones', selected: false, isFicha: true },
		{ title: 'Contratos menores', selected: false, isFicha: true },
		{ title: 'Acuerdos Pleno', selected: false, isFicha: true },
		{ title: 'Acuerdos JGL', selected: false, isFicha: true }
	];
}
