import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import 'ag-grid-enterprise';

// Rutas
import { AppRoutingModule } from './app-routing.module';

// Components
import { HeaderAgGridComponent } from './ag-grid/header-ag-grid/header-ag-grid.component';
import { AppComponent } from './app.component';
import { CheckboxModule } from './commons/components/checkbox/checkbox.module';
import { DetallePresupuestoModule } from './detalle/detalle.module';
import { IndiceComponent } from './indice/indice.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { AvalaibleYearsService } from './services/avalaibleYears.service';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        NavbarComponent,
        IndiceComponent,
        HeaderAgGridComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CheckboxModule,
        DetallePresupuestoModule,
    ],

    providers: [AvalaibleYearsService],
    bootstrap: [AppComponent],
})
export class AppModule {}
