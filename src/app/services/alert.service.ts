import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// https://www.youtube.com/watch?v=l6l5R_0qmlg
export class AlertService {
  private _alertSource = new Subject<any>();
  alert$ = this._alertSource.asObservable();

  constructor() { }

  showAlert(message: string, time: number = 2500) {
    this._alertSource.next({ message, time });
  }
}
