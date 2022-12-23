import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IDataTable } from '../../../../commons/interfaces/dataTable.interface';

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
  @Input() hasDetalle: boolean = true;
  // @Output() clickButton = new EventEmitter<IButtonClasification>();
  @Output() clickButton = new EventEmitter<Event>();
  @Output() clickGraph = new EventEmitter<Event>();
  @Output() clickProgramaDetalle = new EventEmitter<Event>();
  messageYears = this.avalaibleYearsService.message;
  hasDetallePrograma = false;

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    private _router: Router
  ) { }

  showGraph(event: Event): void {
    this.clickGraph.emit(event);
  }

  showProgramaDetalle(event: Event): void {
    this.clickProgramaDetalle.emit(event);
  }

  click(item: IButtonClasification, event: Event): void {
    this.clickButton.emit(event);

    if (item.name === 'Por programa') {
      this.hasDetallePrograma = true;
    } else {
      this.hasDetallePrograma = false;
    }
  }

  menu(): void {
    setTimeout(() => this._router.navigateByUrl("/home"), 50);
  }
}
