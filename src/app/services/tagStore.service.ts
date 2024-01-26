import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TagStoreService {
	private _tag: string;
	private _history: string[] = []; // Pila para almacenar el historial de tags

	setTag(value: string): void {
		this._history.push(value); // Añadir el valor actual a la pila antes de cambiarlo
		this._tag = value;
		console.log('this._history', this._history);
	}

	getTag(): string {
		return this._tag;
	}

	// Obtener el último valor de la pila sin eliminarlo
	peekPreviousTag(): string | null {
		if (this._history.length === 0) {
			return null;
		}
		return this._history[this._history.length - 1];
	}

	// Obtener y eliminar el último valor de la pila
	popPreviousTagOLD(): string | null {
		return this._history.pop() || null;
	}

	// Eliminar el último valor de la pila, devolver el nuevo último y eliminarlo
	popPreviousTag(): string | null {
		this._history.pop(); // Eliminar el último valor actual
		if (this._history.length === 0) {
			return null; // Devolver null si no hay más en el historial
		}
		const newLast = this._history[this._history.length - 1]; // Obtener el nuevo último valor
		this._history.pop(); // Eliminar el nuevo último valor
		return newLast;
	}

	// Limpiar el historial
	clearHistory(): void {
		this._history = [];
	}
}
