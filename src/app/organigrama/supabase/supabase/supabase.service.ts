// https://supabase.com/docs/guides/getting-started/tutorials/with-angular
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
	providedIn: 'root'
})
export class SupabaseService {
	private supabase: SupabaseClient;

	constructor() {
		const supabaseUrl = 'https://cswdadlxiubwdzvqzywc.supabase.co';
		const supabaseKey =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzd2RhZGx4aXVid2R6dnF6eXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2MTkxODAsImV4cCI6MjAxODE5NTE4MH0.m2uvFmJvUoNc2qLndRZT0WhpMARVk7D4L1QveHsoapQ';
		this.supabase = createClient(supabaseUrl, supabaseKey);
	}

	async fetchTableData(tableName: string, id: number): Promise<any> {
		const { data, error } = await this.supabase.from(tableName).select('*').eq('id', id);
		if (error) throw error;
		return data;
	}
}
