import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardMenuComponent } from './components/card-menu/card-menu.component';
import { NgFor } from '@angular/common';
import { CardTableComponent } from './components/card-table/card-table.component';
import { CardInfoComponent } from './components/card-info/card-info.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CardInfoComponent, CardTableComponent, NgFor, CardMenuComponent]
})
export default class HomeComponent {
  cardMenus = [
    {
      rutaImagen: 'assets/img/home/menu1-400x250.webp',
      titulo: 'Visión global',
      subtitulo: 'Para que tengas una idea general de los ingresos y gastos del Ayuntamiento de Jerez.',
      // funcion: this.visionGlobal.bind(this),
      funcion: () => this.visionGlobal(),
      textButton: 'Visión global'
    },
    {
      rutaImagen: 'assets/img/home/menu2-400x250.webp',
      titulo: 'Detalle del presupuesto',
      subtitulo: 'Educación, protección y bienestar social, cultura... ¿Qué área te interesa?',
      funcion: () => this.detalle(),
      textButton: 'Detalle'
    },
    {
      rutaImagen: 'assets/img/home/menu3-400x250.webp',
      titulo: 'Licitaciones',
      subtitulo: 'Todos las licitaciones de obras, contratos menores de nuestro Ayuntamiento',
      funcion: () => this.licitaciones(),
      textButton: 'Licitaciones'
    },
    {
      rutaImagen: 'assets/img/home/menu4-400x250.webp',
      titulo: 'Empleados municipales',
      subtitulo: 'Información sobre los empleados de nuestro Ayuntamiento',
      funcion: () => this.empleados(),
      textButton: 'Empleados'
    }
  ];

  constructor(private _router: Router) { }

  visionGlobal() {
    this._router.navigateByUrl('/visionGlobal');
  }

  detalle() {
    this._router.navigateByUrl('/detalle');
  }

  licitaciones() {
    window.open('https://con.ocmjerez.org/', '_blank');
  }

  empleados() {
    this._router.navigateByUrl('/empleados');
  }
}
