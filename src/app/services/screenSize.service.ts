import { Injectable, NgZone } from '@angular/core';

import { BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ScreenSizeService {
	private screenSize = new BehaviorSubject<number>(window.innerWidth);

	constructor(private ngZone: NgZone) {
		this.ngZone.runOutsideAngular(() => {
			fromEvent(window, 'resize')
				.pipe(
					debounceTime(100), // Debounce para limitar la cantidad de eventos de resize
					map(() => window.innerWidth)
				)
				.subscribe((width) => {
					this.ngZone.run(() => this.screenSize.next(width));
				});
		});
	}

	getScreenSize() {
		return this.screenSize.asObservable();
	}
}
