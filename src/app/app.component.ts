import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	standalone: true,
	imports: [NavbarComponent, NgIf, RouterOutlet, FooterComponent]
})
export class AppComponent implements OnInit {
	ngOnInit(): void {
		localStorage.removeItem('selected_years');
	}
}
