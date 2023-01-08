import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import 'ag-grid-enterprise';

// Rutas
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { IndiceComponent } from './indice/indice.component';
import { AvalaibleYearsService } from './services/avalaibleYears.service';
import { HeaderAgGridComponent } from './ag-grid/header-ag-grid/header-ag-grid.component';
import { DetallePresupuestoModule } from './detalle/detalle.module';
import { CheckboxModule } from './commons/components/checkbox/checkbox.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    IndiceComponent,
    HeaderAgGridComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    CheckboxModule
  ],

  providers: [
    AvalaibleYearsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }