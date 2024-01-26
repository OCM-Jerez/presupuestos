import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';

import NewsFormComponent from '@app/addNewRecodsToSupabase/news-form/news-form.component';

import { ModalService } from '@app/layouts/modal/modal.service';
import { TagStoreService } from '@services/tagStore.service';

@Component({
	selector: 'app-noticias',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './noticias.component.html'
})
export default class NoticiasComponent {
	@ViewChild('modal')
	modal!: ElementRef<HTMLDivElement>;
	@ViewChild('overlay') overlay!: ElementRef<HTMLDivElement>;
	@Input() news: any[];

	private _router = inject(Router);
	private _modalService = inject(ModalService);
	private _tagStoreService = inject(TagStoreService);
	public canAddRowSupabase = environment.canAddRowSupabase;

	addNew(): void {
		this._tagStoreService.getTag();
		this._router.navigateByUrl('addNew');
		// this.useModal();
	}

	useModal() {
		this._modalService.open(NewsFormComponent, {
			animations: {
				modal: {
					enter: 'enter-scaling 0.3s ease-out',
					leave: 'fade-out 0.1s forwards'
				},
				overlay: {
					enter: 'fade-in 1s',
					leave: 'fade-out 0.3s forwards'
				}
			},
			size: {
				width: '40rem',
				minWidth: '850px'
			}
		});
	}

	addCom(): void {
		this._router.navigateByUrl('addCom');
	}

	addDoc(): void {
		this._router.navigateByUrl('addDoc');
	}
}
