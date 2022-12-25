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
  // @Input() hasDetalle: boolean = true;
  // @Output() clickGraph = new EventEmitter<Event>();
  // @Output() clickProgramaDetalle = new EventEmitter<Event>();
  // @Output() clickOrganicoDetalle = new EventEmitter<Event>();
  messageYears = this.avalaibleYearsService.message;
  hasDetallePrograma = false;

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    private _router: Router
  ) { }

  // showGraph(event: Event): void {
  //   this.clickGraph.emit(event);
  // }

  // showProgramaDetalle(event: Event): void {
  //   // this.clickProgramaDetalle.emit(event);
  // }

  // showOrganicoDetalle(event: Event): void {
  //   // this.clickProgramaDetalle.emit(event);
  // }

  // showEconomicoDetalle(event: Event): void {
  //   // const target = event.target as HTMLButtonElement;
  //   // console.log('showEconomicoDetalle', target.innerText);
  //   // this.clickProgramaDetalle.emit(event);
  // }

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
