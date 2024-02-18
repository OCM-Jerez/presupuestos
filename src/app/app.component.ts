import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
// import 'ag-grid-enterprise';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	standalone: true,
	imports: [NavbarComponent, RouterOutlet, FooterComponent]
})
export class AppComponent implements OnInit {
	ngOnInit(): void {
		localStorage.removeItem('selected_years');
	}
}
