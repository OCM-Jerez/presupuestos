import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HasDataChangeService } from '../../services/hasDataChange.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnDestroy {
  event: Event;
  private _subscription: Subscription;
  public hasDataChange: boolean;

  constructor(
    private hasDataChangeService: HasDataChangeService
  ) {
    this._subscription = this.hasDataChangeService.currentHasDataChange.subscribe(hasDataChange => this.hasDataChange = hasDataChange);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}


