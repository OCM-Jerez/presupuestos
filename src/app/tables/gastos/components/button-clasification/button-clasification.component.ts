import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AvalaibleYearsService } from '../../../../services/avalaibleYears.service';
import { IButtonClasification } from '../../model/components.interface';

@Component({
  selector: 'app-button-clasification',
  templateUrl: './button-clasification.component.html',
  styleUrls: ['./button-clasification.component.scss']
})

export class ButtonClasificationComponent {
  @Input() buttons: IButtonClasification[] = [];
  @Input() hasTitle: boolean = true;
  @Input() hasMenu: boolean = true;
  @Input() hasGrafico: boolean = true;
  @Output() clickButton = new EventEmitter<IButtonClasification>();
  @Output() clickGraph = new EventEmitter<Event>();
  messageYears = this.avalaibleYearsService.message;

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    private _router: Router
  ) { }

  showGraph(event: Event): void {
    this.clickGraph.emit(event);
  }

  click(item: IButtonClasification): void {
    this.clickButton.emit(item);
  }

  menu(): void {
    setTimeout(() => this._router.navigateByUrl("/home"), 50);
  }
}
