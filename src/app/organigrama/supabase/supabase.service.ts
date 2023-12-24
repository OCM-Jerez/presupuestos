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

	async fetchTableDataFromView(id: number): Promise<any> {
		const { data, error } = await this.supabase.from('employee_details').select('*').eq('id', id);
		if (error) throw error;
		console.log(JSON.stringify(data));
		return data;
	}

	async fetchTableDataJSON(tableName: string, id: number): Promise<any> {
		const { data, error } = await this.supabase.from(tableName).select('*').eq('id', id);
		if (error) throw error;
		console.log(JSON.stringify(data));

		return new Response(JSON.stringify({ data }), {
			headers: { 'Content-Type': 'application/json' },
			status: 200
		});
	}

	async fetchQuery(tableName: string, id: number): Promise<any> {
		const sql = `select
		p.id as position_id,
		p.employee_id as position_employee_id,
		p.position as position_position,
		p.type as position_type,
		p.url as position_url,
		p.obs as position_obs,
		e.id as employee_id,
		e.name as employee_name,
		e.firstname as employee_firstname,
		e.lastname as employee_lastname,
		e.image as employee_image,
		e.salary as employee_salary,
		e.ayto_url as employee_ayto_url,
		e.cv as employee_cv,
		e.assets as employee_assets,
		e.contact as employee_contact,
		e.linkedin_url as employee_linkedin_url,
		e.wikipedia_url as employee_wikipedia_url,
		pe.position as position_external_position,
		pe.salary as position_external_salary,
		pe.url as position_external_url,
		pe.obs as position_external_obs,
		r.id as record_id,
		r.date as record_date,
		r.name as record_name,
		r.firstname as record_firsname,
		r.lastname as record_lastname,
		r.salary as record_salary,
		r.obs as record_obse,
		r.wikipedia_url as record_wikipedia_url,
		r.linkedin_url as record_linkedin_url,
		r.image as record_image
	  from
		employees e
		join positions p on e.id = p.employee_id
		JOIN positions_external pe ON e.id = pe.employee_id
		join records r on p.id = r.id
	  where
		e.id = 1;
	  `;

		const { data, error } = await this.supabase.from('employees').select(`select
		p.id as position_id,
		p.employee_id as position_employee_id,
		p.position as position_position,
		p.type as position_type,
		p.url as position_url,
		p.obs as position_obs,
		e.id as employee_id,
		e.name as employee_name,
		e.firstname as employee_firstname,
		e.lastname as employee_lastname,
		e.image as employee_image,
		e.salary as employee_salary,
		e.ayto_url as employee_ayto_url,
		e.cv as employee_cv,
		e.assets as employee_assets,
		e.contact as employee_contact,
		e.linkedin_url as employee_linkedin_url,
		e.wikipedia_url as employee_wikipedia_url,
		pe.position as position_external_position,
		pe.salary as position_external_salary,
		pe.url as position_external_url,
		pe.obs as position_external_obs,
		r.id as record_id,
		r.date as record_date,
		r.name as record_name,
		r.firstname as record_firsname,
		r.lastname as record_lastname,
		r.salary as record_salary,
		r.obs as record_obse,
		r.wikipedia_url as record_wikipedia_url,
		r.linkedin_url as record_linkedin_url,
		r.image as record_image
	  from
		employees e
		join positions p on e.id = p.employee_id
		JOIN positions_external pe ON e.id = pe.employee_id
		join records r on p.id = r.id
	  where
		e.id = 1;
	  `);

		if (error) {
			console.error('Error al ejecutar la consulta SQL:', error.message);
		} else {
			console.log('Resultado de la consulta SQL:', data);
		}
	}
}
