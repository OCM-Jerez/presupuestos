import { Injectable } from '@angular/core';
import { ISubtabClasification } from '@interfaces/subtabClasification.interface';

@Injectable({
  providedIn: 'root'
})
export class DataStoreSubtabService {
  private data: ISubtabClasification;

  setData(data: ISubtabClasification): void {
    this.data = data;
  }

  getData(): ISubtabClasification {
    return this.data;
  }
}
