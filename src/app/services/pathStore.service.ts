import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PathStoreService {
	private _path: string;
	private _history: string[] = []; // Pila para almacenar el historial de paths

	setPath(value: string): void {
		if (this._path) {
			this._history.push(this._path); // Añadir el valor actual a la pila antes de cambiarlo
		}
		this._path = value;
	}

	getPath(): string {
		return this._path;
	}

	// Obtener el último valor de la pila sin eliminarlo
	peekPreviousPath(): string | undefined {
		if (this._history.length === 0) {
			return null;
		}
		return this._history[this._history.length - 1];
	}

	// Obtener y eliminar el último valor de la pila
	popPreviousPath(): string | undefined {
		return this._history.pop();
	}

	// Limpiar el historial
	clearHistory(): void {
		this._history = [];
	}
}
