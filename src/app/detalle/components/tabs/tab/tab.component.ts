import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    standalone: true,
    imports: [NgIf],
})
export class TabComponent {
    @Input() title!: string;
    @Input() active = false;
}
