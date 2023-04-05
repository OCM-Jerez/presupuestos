import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IButtonClasification } from '../tables/gastos/model/components.interface';

@Injectable({
    providedIn: 'root',
})
export class SelectedButtonService {
    private SelectedButton = new BehaviorSubject<IButtonClasification>({
        clasificationType: 'gastosProgramaPoliticas',
        name: 'Por política',
        selected: true,
    });
    setSelectedButton(selectedButton: IButtonClasification) {
        this.SelectedButton.next(selectedButton);
    }

    getSelectedButton() {
        return this.SelectedButton.asObservable();
    }
}
