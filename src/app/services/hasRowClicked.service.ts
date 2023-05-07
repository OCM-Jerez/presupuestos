import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HasRowClicked {
  private hasRowClickedSource = new BehaviorSubject<string>(null);
  currentHasRowClicked = this.hasRowClickedSource.asObservable();
  change(hasRowClicked: string) {
    this.hasRowClickedSource.next(hasRowClicked);
  }
}
