import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-card-indice',
    templateUrl: './card-indice.component.html',
    styleUrls: ['./card-indice.component.scss'],
    standalone: true,
})
export class CardIndiceComponent {
    @Input() indice: string;
    @Input() title: string;
    @Input() footer: string;
}
