import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { CardIndiceComponent } from '../commons/components/card/card.component';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
  standalone: true,
  imports: [NgFor, CardIndiceComponent]
})
export default class EmpleadosComponent {
  items = [
    {
      indice: '1.',
      title: 'Funcionarios',
      footer:
        'En desarrollo...',
      img: "../../assets/img/vision-global/busget-stream-1.webp"
    },
    {
      indice: '2.',
      title: 'Laborales',
      footer:
        'En desarrollo...',
      img: "../../assets/img/vision-global/busget-stream-2.webp"
    },
    {
      indice: '3.',
      title: 'Eventuales',
      footer:
        'En desarrollo...',
      img: "../../assets/img/vision-global/busget-stream-3.webp"
    }
  ];
}
