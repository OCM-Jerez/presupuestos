import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	standalone: true,
	imports: [NgIf]
})
export class NavbarComponent {
	private _router = inject(Router);
	public collapsed = false;

	navigateTo(route: string) {
		this._router.navigateByUrl(route);
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
}
