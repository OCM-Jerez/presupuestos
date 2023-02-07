import { Component, OnInit } from '@angular/core';
import { HasDataChangeService } from '../../services/hasDataChange.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {
  public hasDataChange$ = this._hasDataChangeService.currentHasDataChange;
  constructor(
    private _hasDataChangeService: HasDataChangeService
  ) { }

  ngOnInit(): void {
    this.hasDataChange$.subscribe(value => console.log(value));
  }

}


