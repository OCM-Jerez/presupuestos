import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedSubtab4Service {
  private SelectedSubtab4 = new BehaviorSubject<string>('Por económico');
  source$ = this.SelectedSubtab4.asObservable();

  setSelectedSubtab4(selectedSubtab4: string) {
    this.SelectedSubtab4.next(selectedSubtab4);
  }
}
