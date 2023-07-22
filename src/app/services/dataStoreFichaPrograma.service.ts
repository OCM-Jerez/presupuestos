import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IDataGasto } from '@interfaces/dataGasto.interface';

@Injectable({
	providedIn: 'root'
})
export class DataStoreFichaProgramaService {
	private fichaProgramaSubject: BehaviorSubject<IDataGasto[]>;

	constructor() {
		this.fichaProgramaSubject = new BehaviorSubject<IDataGasto[]>([
			{
				CodCap: '',
				CodEco: '',
				CodOrg: '',
				CodPro: '',
				Definitivas: '',
				DesCap: '',
				DesEco: '',
				DesOrg: '',
				DesPro: '',
				GastosComprometidos: '',
				Iniciales: '',
				Modificaciones: '',
				ObligacionesPendientePago: '',
				ObligacionesReconocidasNetas: '',
				Pagos: '',
				RemanenteCredito: '',
				appPresupuestaria: ''
			}
		]);
	}

	getFichaProgramaData(): Observable<IDataGasto[]> {
		return this.fichaProgramaSubject.asObservable();
	}

	setFichaProgramaData(fichaPrograma: IDataGasto[]): void {
		this.fichaProgramaSubject.next(fichaPrograma);
	}
}
