import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HasRowClicked {
  private hasRowClickedSource = new BehaviorSubject<boolean>(false);
  currentHasRowClicked = this.hasRowClickedSource.asObservable();
  change(hasRowClicked: boolean) { this.hasRowClickedSource.next(hasRowClicked) };
}