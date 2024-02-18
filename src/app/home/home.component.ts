import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';

import { CardMenuComponent } from '@commons/components/card-menu/card-menu.component';

import { PathStoreService } from '@services/pathStore.service';
import { TagStoreService } from '@services/tagStore.service';
import { TitleStoreService } from '@services/titleStore.service';

import { IMenuItem } from '@interfaces/menu.interface';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	standalone: true,
	imports: [CardMenuComponent]
})
export default class HomeComponent implements OnInit {
	private _router = inject(Router);
	private _tagStoreService = inject(TagStoreService);
	private _pathStoreService = inject(PathStoreService);
	private _titleStoreService = inject(TitleStoreService);
	public menuOptions: IMenuItem[] = [];

	ngOnInit() {
		import(`@assets/menuOptions/home.json`).then((data) => {
			this.menuOptions = data.default.map((item: IMenuItem) => {
				const modifiedItem = {
					...item,
					rutaImagen: environment.pathImgSupabase + item.tag + '.jpg'
				};
				return this.createCardMenu(modifiedItem);
			});
		});

		this._pathStoreService.clearHistory();
		this._tagStoreService.clearHistory();
		this._titleStoreService.clearHistory();
	}

	createCardMenu(item: IMenuItem) {
		return {
			...item,
			funcion: () => {
				this._tagStoreService.setTag(item.tag);
				this._titleStoreService.setTitle(item.title);
				this._router.navigateByUrl('level1');
			}
		};
	}
}
