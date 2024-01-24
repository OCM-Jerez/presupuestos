import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TitleStoreService {
	private _title: string;

	setTitle(value: string): void {
		this._title = value;
	}

	getTitle(): string {
		return this._title;
	}
}
