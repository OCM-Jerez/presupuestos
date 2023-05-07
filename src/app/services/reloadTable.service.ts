import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReloadTableService {
  private _reloadTableSubject = new Subject<void>();

  get reloadTable$() {
    return this._reloadTableSubject.asObservable();
  }

  triggerReloadTable() {
    this._reloadTableSubject.next();
  }
}
