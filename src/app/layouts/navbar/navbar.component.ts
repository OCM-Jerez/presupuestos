import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(
    public router: Router,
  ) { }



  explicamos() {
    this.router.navigateByUrl('/explicamos')
  }

  glosario() {
    this.router.navigateByUrl('/glosario')
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
}