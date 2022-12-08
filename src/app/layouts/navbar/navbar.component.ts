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
    // this.collapsed = true;
  }
  visionGlobal() {
    this.router.navigateByUrl('/home')
  }

  detallePresupuesto() {
    this.router.navigateByUrl('/detallePresupuesto')
  }

  licitaciones() {
    window.open('https://con.ocmjerez.org/', '_blank');
  }

  explicamos() {
    this.router.navigateByUrl('/explicamos')
  }

  glosario() {
    this.router.navigateByUrl('/glosario')
  }

}