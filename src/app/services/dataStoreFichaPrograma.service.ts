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
				Definitivas: 0,
				DesCap: '',
				DesEco: '',
				DesOrg: '',
				DesPro: '',
				GastosComprometidos: 0,
				Iniciales: 0,
				Modificaciones: 0,
				ObligacionesPendientePago: 0,
				ObligacionesReconocidasNetas: 0,
				Pagos: 0,
				RemanenteCredito: 0,
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
