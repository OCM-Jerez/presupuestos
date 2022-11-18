import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AvalaibleYearsService } from '../../../../services/avalaibleYears.service';
import { IButtonClasification } from '../../model/components.interface';

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

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    private _router: Router
  ) { }
  messageYears = this.avalaibleYearsService.message;

  ngOnInit(): void {
  }

  showGraph(): void {
  }

  click(item: IButtonClasification): void {
    this.clickButton.emit(item);
  }

  menu(): void {
    setTimeout(() => this._router.navigateByUrl("/home"), 50);
    //this.clickVolver.emit(item);
  }
}
