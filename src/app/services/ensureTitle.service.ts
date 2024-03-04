import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
	providedIn: 'root'
})
export class EnsureTitleService {
	constructor(private _supabaseService: SupabaseService) {}

	async ensureTitle(tag: string): Promise<string> {
		try {
			const data = await this._supabaseService.fetchDataByTag('tag_title', tag);
			if (data && data.length > 0) {
				return data[0].title; // Cambiado para devolver el título
			} else {
				console.log('No se encontraron datos para el tag:', tag);
				return null; // Devuelve null si no se encuentra el título
			}
		} catch (error) {
			console.error('Error fetching data:', error);
			return null; // Devuelve null en caso de error
		}
	}
}
