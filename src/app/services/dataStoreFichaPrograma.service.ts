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
				Definitivas1: '',
				DesCap: '',
				DesEco: '',
				DesOrg: '',
				DesPro: '',
				GastosComprometidos1: '',
				Iniciales1: '',
				Modificaciones1: '',
				ObligacionesPendientePago1: '',
				ObligacionesReconocidasNetas1: '',
				Pagos1: '',
				RemanenteCredito1: '',
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
