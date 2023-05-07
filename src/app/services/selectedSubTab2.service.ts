import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedSubTab2Service {
  private SelectedSubTab2 = new BehaviorSubject<string>('Por programa');
  source$ = this.SelectedSubTab2.asObservable();

  setSelectedSubTab2(selectedSubTab2: string) {
    this.SelectedSubTab2.next(selectedSubTab2);
  }
}
