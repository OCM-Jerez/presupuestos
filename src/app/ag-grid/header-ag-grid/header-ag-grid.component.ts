// import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams, IHeaderParams } from 'ag-grid-community';

interface MyParams extends IHeaderParams {
	menuIcon: string;
}

@Component({
	selector: 'app-header-ag-grid',
	templateUrl: './header-ag-grid.component.html',
	styleUrls: ['./header-ag-grid.component.scss'],
	standalone: true
})
export class HeaderAgGridComponent implements IHeaderAngularComp {
	public params: MyParams;
	public sorted: string;
	private elementRef: ElementRef;

	private myHeaderNameArray: any;
	public myHeaderNameLinea1: string;
	public myHeaderNameLinea2: string;
	public myHeaderNameLinea3: string;

	constructor(elementRef: ElementRef) {
		this.elementRef = elementRef;
	}

	refresh(): boolean {
		throw new Error('Method not implemented.');
	}

	afterGuiAttached?(): void {
		throw new Error('Method not implemented.');
	}

	agInit(params: MyParams): void {
		// console.log(params);
		this.params = params;
		this.params.column.addEventListener('sortChanged', this.onSortChanged.bind(this));
		this.onSortChanged();

		// Se recibe un string separado por comas, cada coma se convierte en una linea.
		this.myHeaderNameArray = this.params.displayName.slice(0, this.params.displayName.length).split(',');
		this.myHeaderNameLinea1 = this.myHeaderNameArray[0];
		this.myHeaderNameLinea2 = this.myHeaderNameArray[1];
		this.myHeaderNameLinea3 = this.myHeaderNameArray[2];

		// console.log(this.myHeaderNameArray);
		// console.log(this.myHeaderNameLinea1);
		// console.log(this.myHeaderNameLinea2);
		// console.log(this.myHeaderNameLinea3);
	}

	// ngOnDestroy() {
	// console.log(`Destroying HeaderComponent`);
	// }

	onMenuClick() {
		this.params.showColumnMenu(this.querySelector('.customHeaderMenuButton'));
	}

	onSortRequested(order, event) {
		this.params.setSort(order, event.shiftKey);
	}

	onSortChanged() {
		if (this.params.column.isSortAscending()) {
			this.sorted = 'asc';
		} else if (this.params.column.isSortDescending()) {
			this.sorted = 'desc';
		} else {
			this.sorted = '';
		}
	}

	private querySelector(selector: string) {
		return this.elementRef.nativeElement.querySelector('.customHeaderMenuButton', selector) as HTMLElement;
	}
}
