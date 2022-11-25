import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PruebaComponent } from './prueba.component';
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
  declarations: [
    PruebaComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule
  ]
})
export class PruebaModule { }
