import { Component, OnInit } from '@angular/core';
import { AlertService } from '@services/alert.service';
import { FooterComponent } from './layouts/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { NavbarComponent } from './layouts/navbar/navbar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [
        NavbarComponent,
        NgIf,
        RouterOutlet,
        FooterComponent,
    ],
})
export class AppComponent implements OnInit {
    message = '';
    showAlert = false;

    constructor(private _alertService: AlertService) {}

    ngOnInit(): void {
        localStorage.removeItem('selected_years');
        this._alertService.alert$.subscribe((res) => {
            this.message = res.message;
            this.showAlert = true;
            setTimeout(() => {
                this.showAlert = false;
            }, res.time);
        });
    }
}
