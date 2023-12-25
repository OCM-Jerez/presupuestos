// https://supabase.com/docs/guides/getting-started/tutorials/with-angular
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

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
		return data;
	}

	async fetchDataFromView(id: number): Promise<any> {
		const { data, error } = await this._supabase.from('employee_details').select('*').eq('id', id);
		if (error) throw error;
		console.log(JSON.stringify(data));
		return data;
	}
}
