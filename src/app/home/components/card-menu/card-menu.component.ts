import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-card-menu',
    templateUrl: './card-menu.component.html',
    styleUrls: ['./card-menu.component.scss'],
})
export class CardMenuComponent {
    @Input() rutaImagen: string;
    @Input() titulo: string;
    @Input() subtitulo: string;
    @Input() textButton: string;

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
