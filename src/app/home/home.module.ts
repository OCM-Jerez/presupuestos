import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardInfoComponent } from './components/card-info/card-info.component';
import { CardTableComponent } from './components/card-table/card-table.component';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [HomeComponent, CardInfoComponent, CardTableComponent],
    imports: [CommonModule],
})
export class HomeModule {}
