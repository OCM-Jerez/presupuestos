import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HasDataChangeService {
    private HasDataChangeSource = new BehaviorSubject<boolean>(true);
    currentHasDataChange = this.HasDataChangeSource.asObservable();
    change(hasDataChange: boolean) {
        this.HasDataChangeSource.next(hasDataChange);
    }
}
