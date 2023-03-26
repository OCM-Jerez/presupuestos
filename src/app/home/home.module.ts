import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardInfoComponent } from './components/card-info/card-info.component';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [HomeComponent, CardInfoComponent],
    imports: [CommonModule],
})
export class HomeModule {}
