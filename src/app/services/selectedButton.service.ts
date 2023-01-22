import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SelectedButtonService {
    private SelectedButton = new BehaviorSubject<string>('inicio sin cambiar');

    setSelectedButton(selectedButton: string) {
        this.SelectedButton.next(selectedButton);
    }

    getSelectedButton() {
        return this.SelectedButton.asObservable();
    }
}
