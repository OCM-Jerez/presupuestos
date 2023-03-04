import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  collapsed = false;
  constructor(
    public router: Router,
  ) { }

  inicio() {
    this.router.navigateByUrl('/')
    this.collapsed = true;
    setTimeout(() => {
      this.collapsed = false;
    }, 0);
  }
  visionGlobal() {
    this.router.navigateByUrl('/home')
    this.collapsed = true;
    setTimeout(() => {
      this.collapsed = false;
    }, 0);
  }

  detallePresupuesto() {
    this.router.navigateByUrl('/detallePresupuesto')
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
    this.router.navigateByUrl('/empleados')
    this.collapsed = true;
    setTimeout(() => {
      this.collapsed = false;
    }, 0);
  }

  explicamos() {
    this.router.navigateByUrl('/explicamos')
    this.collapsed = true;
    setTimeout(() => {
      this.collapsed = false;
    }, 0);
  }

  glosario() {
    this.router.navigateByUrl('/glosario')
    this.collapsed = true;
    setTimeout(() => {
      this.collapsed = false;
    }, 0);
  }

}