import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AvalaibleYearsService } from '../../../../services/avalaibleYears.service';
import { DataStoreService } from '../../../../services/dataStore.service';
import { FlagService } from '../../../../services/flag.service';
import { IButtonClasification } from '../../model/components.interface';

@Component({
  selector: 'app-button-clasification',
  templateUrl: './button-clasification.component.html',
  styleUrls: ['./button-clasification.component.scss']
})

export class ButtonClasificationComponent implements OnDestroy {
  @Input() buttons: IButtonClasification[] = [];
  @Input() buttonsAdditional: string[] = [];
  @Input() hasTitle: boolean = true;
  // @Input() hasMenu: boolean = true;
  // @Input() hasGrafico: boolean = true;
  // @Input() hasDetalleOrganico: boolean = true;
  // @Input() hasDetalleEconomico: boolean = true;
  @Output() clickButton = new EventEmitter<Event>();
  messageYears = this.avalaibleYearsService.message;
  hasDetallePrograma = false;
  private subscription: Subscription;
  public flag: boolean;
  @Input()
  set event(event: Event) {
    if (event) {
      const target = event.target as HTMLButtonElement;
      // console.log('target', target.textContent.trim());

      // switch (target.textContent.trim()) {
      //   case 'Gráfico detalladado':
      //     this.showGraph();
      //     break;
      //   case 'Detalle del programa seleecionado':
      //     this.showProgramaDetalle();
      //     break;
      //   case 'Programas que componen orgánico seleccionado':
      //     this.showOrganicoDetalle();
      //     break;
      //   case 'Programas que gastan del elemento seleccionado':
      //     this.showEconomicoDetalle();
      //     break;
      // }

    }
  }

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    private _router: Router,
    private _dataStoreService: DataStoreService,
    private _flagService: FlagService
  ) {
    this.subscription = this._flagService.currentFlag.subscribe(flag => this.flag = flag);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  click(event: Event): void {
    this.clickButton.emit(event);
    const target = event.target as HTMLButtonElement;
    if (target.innerText === 'Por programa') {
      this.hasDetallePrograma = true;
    } else {
      this.hasDetallePrograma = false;
    }

    // console.log('this._dataStoreService.selectedCodeRow', this._dataStoreService.selectedCodeRow);
    // if (this._dataStoreService.selectedCodeRow){}

  }

  menu(): void {
    setTimeout(() => this._router.navigateByUrl("/home"), 50);
  }
}
