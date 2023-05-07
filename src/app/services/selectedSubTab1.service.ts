import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedSubTab1Service {
  private SelectedSubTab1 = new BehaviorSubject<string>('Por económico');
  source$ = this.SelectedSubTab1.asObservable();

  setSelectedSubTab1(selectedSubTab1: string) {
    this.SelectedSubTab1.next(selectedSubTab1);
  }
}
