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

	navigateTo() {
		this.router.navigateByUrl('/');
	}

	volver() {
		this._pathStoreService.setPath(this._pathStoreService.popPreviousPath());
		this._tagStoreService.setTag(this._tagStoreService.popPreviousTag());
		this._titleStoreService.setTitle(this._titleStoreService.popPreviousTitle());
		this._location.back();
	}
}
