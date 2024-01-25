import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TitleStoreService {
	private _title: string;
	private _history: string[] = []; // Pila para almacenar el historial de títulos

	setTitle(value: string): void {
		if (this._title) {
			this._history.push(this._title); // Añadir el valor actual a la pila antes de cambiarlo
		}
		this._title = value;
	}

	getTitle(): string {
		return this._title;
	}

	// Obtener el último valor de la pila sin eliminarlo
	peekPreviousTitle(): string | undefined {
		if (this._history.length === 0) {
			return null;
		}
		return this._history[this._history.length - 1];
	}

	// Obtener y eliminar el último valor de la pila
	popPreviousTitle(): string | undefined {
		return this._history.pop();
	}

	// Limpiar el historial
	clearHistory(): void {
		this._history = [];
	}
}
