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
import { CardIndiceComponent } from './indice/card-indice/card-indice.component';
import { IndiceComponent } from './indice/indice.component';
import { TableDataPresupuestoComponent } from './indice/table-data-presupuesto/table-data-presupuesto.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';

// Modules
import { CheckboxModule } from './commons/components/checkbox/checkbox.module';
import { DetalleModule } from './detalle/detalle.module';

// Services
import { AvalaibleYearsService } from '@services/avalaibleYears.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CheckboxModule,
        DetalleModule,
        CardIndiceComponent,
        FooterComponent,
        HeaderAgGridComponent,
        IndiceComponent,
        NavbarComponent,
        TableDataPresupuestoComponent,
    ],
    providers: [AvalaibleYearsService],
    bootstrap: [AppComponent],
})
export class AppModule {}
