import { Injectable } from '@angular/core';
import { ITab } from '@interfaces/tab.interface';

@Injectable({
  providedIn: 'root'
})
export class DataStoreTabService {
  private data: ITab;

  setData(data: ITab): void {
    this.data = data;
  }

  getData(): ITab {
    return this.data;
  }
}
