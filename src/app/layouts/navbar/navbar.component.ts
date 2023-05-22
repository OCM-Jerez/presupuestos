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

  detalle() {
    this._router.navigateByUrl('/detalle');
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
