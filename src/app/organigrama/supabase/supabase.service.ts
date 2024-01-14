// https://supabase.com/docs/guides/getting-started/tutorials/with-angular
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// import fileData from 'D:/create-licitacion/jpgFiles.json';

@Injectable({
	providedIn: 'root'
})
export class SupabaseService {
	private _supabase: SupabaseClient;

	constructor() {
		const supabaseUrl = environment.supabaseUrl;
		const supabaseKey = environment.supabaseKey;
		this._supabase = createClient(supabaseUrl, supabaseKey);
	}

	// TODO: - Add types
	async fetchData(tableName: string): Promise<any> {
		const { data, error } = await this._supabase.from(tableName).select('*');
		if (error) throw error;
		return data;
	}

	async fetchDataById(tableName: string, id: number): Promise<any> {
		const { data, error } = await this._supabase.from(tableName).select('*').eq('id', id);
		if (error) throw error;
		console.log('data', data);

		return data;
	}

	async fetchDataByIdPuesto(tableName: string, id: string): Promise<any> {
		const { data, error } = await this._supabase.from(tableName).select('*').eq('id_uo', +id);
		if (error) throw error;
		console.log('data', data);

		return data;
	}

	async fetchDataByIdString(tableName: string, id: string) {
		console.log('id', id);

		const { data, error } = await this._supabase.from(tableName).select('*').eq('id', +id);
		if (+id === 284) {
			console.log('data', data);
		}

		if (error) throw error;
		return data;
	}

	async fetchDataByTag(tableName: string, tag: string): Promise<any> {
		const { data, error } = await this._supabase.from(tableName).select('*').eq('tag', tag);

		if (error) throw error;
		return data;
	}

	async fetchDataByTagOrder(tableName: string, tag: string, order: boolean): Promise<any> {
		const { data, error } = await this._supabase
			.from(tableName)
			.select('*')
			.eq('tag', tag)
			.order('date', { ascending: order });
		if (error) throw error;
		return data;
	}

	async fetchDataFromView(view: string, id: number | string): Promise<any> {
		const { data, error } = await this._supabase.from(view).select('*').eq('id', id);
		if (error) throw error;
		// console.log(JSON.stringify(data));
		return data;
	}

	async insertRow(tableName: string, data: any): Promise<any> {
		const { data: insertedData, error } = await this._supabase.from(tableName).insert([data]);

		if (error) throw error;
		return insertedData;
	}

	async updateRow(tableName: string, newValues, tag: string) {
		console.log(newValues);

		const { data, error } = await this._supabase.from(tableName).update(newValues).eq('tag', tag).select();

		if (error) throw error;
		return data;
	}

	// uploadFile = async (bucketName, filePath, fileData?, options?) => {
	// 	console.log('uploadFile');

	// 	try {
	// 		// Obtener la imagen como blob
	// 		const response = await fetch(filePath);
	// 		if (!response.ok) throw new Error('Network response was not ok');
	// 		const imageBlob = await response.blob();

	// 		// Cargar el blob a Supabase
	// 		const { data, error } = await this._supabase.storage.from(bucketName).upload(filePath, imageBlob, options);

	// 		if (error) throw error;

	// 		console.log(`File uploaded to ${filePath}`, data);
	// 	} catch (error) {
	// 		console.error('Error:', error);
	// 	}
	// };

	async uploadFile(file) {
		const filePath = `${file.name}`; // Asegúrate de cambiar 'nombre_del_directorio' al directorio deseado en Supabase Storage

		try {
			const { error, data } = await this._supabase.storage.from('imgEmpleados').upload(filePath, file);

			if (error) {
				throw error;
			}

			console.log('Archivo subido con éxito:', data);
		} catch (error) {
			console.error('Error en la subida del archivo:', error);
		}
	}

	async uploadFileFromJSON(fileData) {
		const filePath = `${fileData.name}`; // Asegúrate de cambiar 'nombre_del_directorio' al directorio deseado en Supabase Storage

		try {
			const { error, data } = await this._supabase.storage.from('imgParaClasificar').upload(filePath, filePath);

			if (error) {
				throw error;
			}

			console.log('Archivo subido con éxito:', data);
		} catch (error) {
			console.error('Error en la subida del archivo:', error);
		}
	}
}
