import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { TagStoreService } from '@services/tagStore.service';
import { PathStoreService } from '@services/pathStore.service';
import { TitleStoreService } from '@services/titleStore.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	standalone: true,
	imports: []
})
export class NavbarComponent {
	private _location = inject(Location);
	private _tagStoreService = inject(TagStoreService);
	private _pathStoreService = inject(PathStoreService);
	private _titleStoreService = inject(TitleStoreService);
	public router = inject(Router);

	public collapsed = false;

	navigateTo(route: string) {
		this.router.navigateByUrl(route);
		this.toggleCollapse(true);
	}

	toggleCollapse(state: boolean) {
		this.collapsed = state;
		if (state) {
			setTimeout(() => {
				this.collapsed = false;
			}, 0);
		}
	}

	volver() {
		this._pathStoreService.setPath(this._pathStoreService.popPreviousPath());
		// console.log('this._pathStoreService.getPath()', this._pathStoreService.getPath());

		this._tagStoreService.setTag(this._tagStoreService.popPreviousTag());
		console.log('this._tagStoreService.getTag()', this._tagStoreService.getTag());

		this._titleStoreService.setTitle(this._titleStoreService.popPreviousTitle());
		// console.log('this._titleStoreService.getTitle()', this._titleStoreService.getTitle());

		this._location.back();
	}
}
