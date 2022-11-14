import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AvalaibleYearsService } from '../../../../services/avalaibleYears.service';
import { IButtonClasification } from '../../model/components.interface';

// import { CLASIFICATION_TYPE } from '../../../../commons/util/util';
@Component({
  selector: 'app-button-clasification',
  templateUrl: './button-clasification.component.html',
  styleUrls: ['./button-clasification.component.scss']
})

export class ButtonClasificationComponent implements OnInit {
  // @Input() messageYears = '';
  @Input() buttons: IButtonClasification[] = [];

  @Output() clickButton = new EventEmitter<IButtonClasification>();
  @Output() clickVolver = new EventEmitter<IButtonClasification>();

  constructor(public avalaibleYearsService: AvalaibleYearsService,) { }
  messageYears = this.avalaibleYearsService.message;

  ngOnInit(): void {
  }

  showGraph(): void {
  }

  click(item: IButtonClasification): void {
    this.clickButton.emit(item);
  }

  volver(): void {
    //this.clickVolver.emit(item);
  }
}
