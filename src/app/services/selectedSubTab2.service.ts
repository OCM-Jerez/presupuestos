import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedSubtab2Service {
  private SelectedSubtab2 = new BehaviorSubject<string>('Por programa');
  source$ = this.SelectedSubtab2.asObservable();

  setSelectedSubtab2(selectedSubtab2: string) {
    this.SelectedSubtab2.next(selectedSubtab2);
  }
}
