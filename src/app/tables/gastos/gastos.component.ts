import { Component } from '@angular/core';
import { HasDataChangeService } from '../../services/hasDataChange.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent {
  event: Event;
  public hasDataChange$ = this._hasDataChangeService.currentHasDataChange;
  constructor(
    private _hasDataChangeService: HasDataChangeService
  ) { }

}


