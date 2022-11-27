import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from '../../../app-routing.module';
import { PruebaModule } from '../../../hightcharts/prueba/prueba.module';



@NgModule({
  declarations: [CheckboxComponent],
  exports: [
    CheckboxComponent
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    // HttpClientModule,
    // AppRoutingModule,
    FormsModule,
    // NgSelectModule,
    // ReactiveFormsModule,
    //DetallePresupuestoModule,
    // PruebaModule
  ]
})
export class CheckboxModule { }
