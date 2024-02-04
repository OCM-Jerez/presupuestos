import { ApplicationRef, ComponentRef, EnvironmentInjector, Injectable, Type, createComponent } from '@angular/core';
import { Options } from './modal-options';
import { ModalComponent } from './modal.component';

@Injectable({
	providedIn: 'root'
})
export class ModalService {
	newModalComponent!: ComponentRef<ModalComponent>;
	options!: Options | undefined;

	constructor(
		private appRef: ApplicationRef,
		private injector: EnvironmentInjector
	) {}

	open<C>(vcrOrComponent: Type<C>, param2?: Options, options?: Options) {
		// console.log('vcrOrComponent', vcrOrComponent);
		// console.log('param2', param2);
		// console.log('options', options);
		this.openWithComponent(vcrOrComponent);
		this.options = param2 as Options | undefined;
	}

	private openWithComponent(component: Type<unknown>) {
		const newComponent = createComponent(component, {
			environmentInjector: this.injector
		});

		this.newModalComponent = createComponent(ModalComponent, {
			environmentInjector: this.injector,
			projectableNodes: [[newComponent.location.nativeElement]]
		});

		document.body.appendChild(this.newModalComponent.location.nativeElement);

		// Attach views to the changeDetection cycle
		this.appRef.attachView(newComponent.hostView);
		this.appRef.attachView(this.newModalComponent.hostView);
	}

	close() {
		this.newModalComponent.instance.close();
	}
}
