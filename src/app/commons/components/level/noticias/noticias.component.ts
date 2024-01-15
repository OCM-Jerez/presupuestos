import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import NewsFormComponent from '@app/addNewRecodsToSupabase/news-form/news-form.component';
import { ModalService } from '@app/layouts/modal/modal.service';
import { environment } from '@environments/environment';
import { TagStoreService } from '@services/tagStore.service';

@Component({
	selector: 'app-noticias',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './noticias.component.html',
	styleUrls: ['./noticias.component.scss']
})
export default class NoticiasComponent implements OnInit {
	// @ViewChild('view', { static: true, read: ViewContainerRef })
	@ViewChild('modal')
	modal!: ElementRef<HTMLDivElement>;
	@ViewChild('overlay') overlay!: ElementRef<HTMLDivElement>;
	// vcr!: ViewContainerRef;
	@Input() news: any[];
	private _router = inject(Router);
	private _route = inject(ActivatedRoute);
	private _modalService = inject(ModalService);
	private _tagStoreService = inject(TagStoreService);
	private _param = '';
	public canAddRowSupabase = environment.canAddRowSupabase;

	ngOnInit(): void {
		const routeConfig = this._route.snapshot.routeConfig;
		const paramMap = this._route.snapshot.paramMap;

		if (routeConfig && routeConfig.path) {
			const pathSegments = routeConfig.path.split('/');
			const dynamicSegment = pathSegments.find((segment) => segment.startsWith(':'));
			if (dynamicSegment) {
				// Extraer el nombre del parámetro dinámico (sin los dos puntos ':')
				const paramName = dynamicSegment.substring(1);
				this._param = paramMap.get(paramName);
			} else {
				this._param = routeConfig.path.includes('/') ? routeConfig.path.split('/')[1] : routeConfig.path;
			}
		} else {
			console.log('Configuración de ruta no disponible');
		}
	}

	addNew(): void {
		this._tagStoreService.setTag(this._param);
		this._router.navigateByUrl(`/addNew/${this._param}`);
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
		this._router.navigateByUrl(`/addCom/${this._param}`);
	}

	addDoc(): void {
		this._router.navigateByUrl(`/addDoc/${this._param}`);
	}
}
