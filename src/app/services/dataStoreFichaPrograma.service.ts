import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// import { IGastos } from '@interfaces/gastos.interface';
import { IDataGasto } from '@interfaces/dataGasto.interface';

@Injectable({
	providedIn: 'root'
})
export class DataStoreFichaProgramaService {
	// private fichaProgramaSubject: BehaviorSubject<IGastos[]>;
	private fichaProgramaSubject: BehaviorSubject<IDataGasto[]>;

	// constructor() {
	// 	this.fichaProgramaSubject = new BehaviorSubject<IGastos[]>([
	// 		{
	// 			CodCap: 0,
	// 			CodEco: 0,
	// 			CodOrg: 0,
	// 			CodPro: 0,
	// 			Definitivas2023: 0,
	// 			DesCap: '',
	// 			DesEco: '',
	// 			DesOrg: '',
	// 			DesPro: '',
	// 			GastosComprometidos2023: 0,
	// 			Iniciales2023: 0,
	// 			Modificaciones2023: 0,
	// 			ObligacionesPendientePago2023: 0,
	// 			ObligacionesReconocidasNetas2023: 0,
	// 			Pagos2023: 0,
	// 			RemanenteCredito2023: 0,
	// 			appPresupuestaria: ''
	// 		}
	// 	]);
	// }

	// getFichaProgramaData(): Observable<IGastos[]> {
	// 	return this.fichaProgramaSubject.asObservable();
	// }

	// setFichaProgramaData(fichaPrograma: IGastos[]): void {
	// 	this.fichaProgramaSubject.next(fichaPrograma);
	// }

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
