import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [NgIf]
})
export class NavbarComponent {
  collapsed = false;
  constructor(private _router: Router) {}

  inicio() {
    this._router.navigateByUrl('/');
    this.collapsed = true;
    setTimeout(() => {
      this.collapsed = false;
    }, 0);
  }
  visionGlobal() {
    this._router.navigateByUrl('/visionGlobal');
    this.collapsed = true;
    setTimeout(() => {
      this.collapsed = false;
    }, 0);
  }

  detallePresupuesto() {
    this._router.navigateByUrl('/detallePresupuesto');
    this.collapsed = true;
    setTimeout(() => {
      this.collapsed = false;
    }, 0);
  }

  licitaciones() {
    window.open('https://con.ocmjerez.org/', '_blank');
    this.collapsed = true;
    setTimeout(() => {
      this.collapsed = false;
    }, 0);
  }

  empleados() {
    this._router.navigateByUrl('/empleados');
    this.collapsed = true;
    setTimeout(() => {
      this.collapsed = false;
    }, 0);
  }

  explicamos() {
    this._router.navigateByUrl('/explicamos');
    this.collapsed = true;
    setTimeout(() => {
      this.collapsed = false;
    }, 0);
  }

  glosario() {
    this._router.navigateByUrl('/glosario');
    this.collapsed = true;
    setTimeout(() => {
      this.collapsed = false;
    }, 0);
  }
}
