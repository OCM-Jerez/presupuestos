import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HasDataChangeService {
  private HasDataChangeSource = new BehaviorSubject<boolean>(false);
  currentHasDataChange = this.HasDataChangeSource.asObservable();
  change(hasDataChange: boolean) { this.HasDataChangeSource.next(hasDataChange) };
}
