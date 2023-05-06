import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardInfoComponent } from './components/card-info/card-info.component';
import { CardTableComponent } from './components/card-table/card-table.component';
import { HomeComponent } from './home.component';
import { CardMenuComponent } from './components/card-menu/card-menu.component';

@NgModule({
    imports: [CommonModule, HomeComponent, CardInfoComponent, CardTableComponent, CardMenuComponent],
})
export class HomeModule {}
