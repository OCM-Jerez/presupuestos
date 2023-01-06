import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

import { Subscription } from 'rxjs';

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
  @Output() clickButton = new EventEmitter<Event>();
  private subscription: Subscription;
  public flag: boolean;

  constructor(
    private _flagService: FlagService
  ) {
    this.subscription = this._flagService.currentFlag.subscribe(flag => this.flag = flag);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  click(event: Event): void {
    this.clickButton.emit(event);
  }

}
