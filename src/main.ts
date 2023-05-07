import { enableProdMode, importProvidersFrom } from '@angular/core';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule, BrowserModule, FormsModule, ReactiveFormsModule),
    AvalaibleYearsService,
    provideHttpClient(withInterceptorsFromDi())
  ]
}).catch((err) => console.error(err));
