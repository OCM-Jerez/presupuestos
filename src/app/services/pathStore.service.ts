import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PathStoreService {
	private _path: string;

	setPath(value: string): void {
		this._path = value;
	}

	getPath(): string {
		return this._path;
	}
}
