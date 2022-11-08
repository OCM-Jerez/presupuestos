import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CLASIFICATION_TYPE } from '../../../../commons/util/util';
import { IButtonClasification } from '../../model/components.interface';

@Component({
  selector: 'app-button-clasification',
  templateUrl: './button-clasification.component.html',
  styleUrls: ['./button-clasification.component.scss']
})
export class ButtonClasificationComponent implements OnInit {

  @Input() messageYears = '';
  @Input() buttons: IButtonClasification[] = [];

  @Output() clickButton = new EventEmitter<IButtonClasification>();
  @Output() clickVolver = new EventEmitter<IButtonClasification>();
  constructor() { }

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
