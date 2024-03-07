import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';

import { CardMenuComponent } from '@commons/components/card-menu/card-menu.component';

import { SupabaseService } from '@services/supabase.service';

import { IMenuItem } from '@interfaces/menu.interface';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	standalone: true,
	imports: [CardMenuComponent]
})
export default class HomeComponent implements OnInit {
	private _supabaseService = inject(SupabaseService);
	private _router = inject(Router);
	public menuOptions: IMenuItem[] = [];

	ngOnInit() {
		this.createCardMenu();
	}

	async createCardMenu() {
		try {
			const data = await this._supabaseService.fetchDataByLevel('home');
			this.menuOptions = data.map(({ tag, ...item }: IMenuItem) => ({
				...item,
				tag,
				rutaImagen: `${environment.pathImgSupabase}${tag}.jpg`,
				funcion: () => this._router.navigateByUrl(`level1/${tag}`)
			}));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}
}
