import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true
})
export class CardIndiceComponent {
  @Input() indice: string;
  @Input() title: string;
  @Input() footer: string;
  @Input() img: string;
}
