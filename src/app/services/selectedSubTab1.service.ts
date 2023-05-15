import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedSubtab1Service {
  private SelectedSubtab1 = new BehaviorSubject<string>('Por económico');
  source$ = this.SelectedSubtab1.asObservable();

  setSelectedSubtab1(selectedSubtab1: string) {
    this.SelectedSubtab1.next(selectedSubtab1);
  }
}
