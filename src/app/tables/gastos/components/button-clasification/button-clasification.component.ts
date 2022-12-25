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
  @Input() hasDetalleOrganico: boolean = true;
  @Input() hasDetalleEconomico: boolean = true;
  @Output() clickButton = new EventEmitter<Event>();
  messageYears = this.avalaibleYearsService.message;
  hasDetallePrograma = false;

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    private _router: Router
  ) { }

  click(event: Event): void {
    this.clickButton.emit(event);
    const target = event.target as HTMLButtonElement;

    if (target.innerText === 'Por programa') {
      this.hasDetallePrograma = true;
    } else {
      this.hasDetallePrograma = false;
    }

  }

  menu(): void {
    setTimeout(() => this._router.navigateByUrl("/home"), 50);
  }
}
