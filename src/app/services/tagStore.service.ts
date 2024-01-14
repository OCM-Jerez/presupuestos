import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TagStoreService {
	private _tag: string;

	setTag(value: string): void {
		this._tag = value;
	}

	getTag(): string {
		return this._tag;
	}
}
