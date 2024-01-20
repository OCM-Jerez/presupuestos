import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	standalone: true,
	imports: []
})
export class NavbarComponent {
	public router = inject(Router);
	private _location = inject(Location);

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
		this._location.back();
	}
}
