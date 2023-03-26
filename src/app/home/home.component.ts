import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    constructor(private _router: Router) {}

    visionGlobal() {
        this._router.navigateByUrl('/home');
    }

    detallePresupuesto() {
        this._router.navigateByUrl('/detallePresupuesto');
    }

    licitaciones() {
        window.open('https://con.ocmjerez.org/', '_blank');
    }

    empleados() {
        this._router.navigateByUrl('/empleados');
    }
}
