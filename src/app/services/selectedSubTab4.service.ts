import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedSubTab4Service {
  private SelectedSubTab4 = new BehaviorSubject<string>('Por económico');
  source$ = this.SelectedSubTab4.asObservable();

  setSelectedSubTab4(selectedSubTab4: string) {
    this.SelectedSubTab4.next(selectedSubTab4);
  }
}
