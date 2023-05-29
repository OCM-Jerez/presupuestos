import { enableProdMode, importProvidersFrom } from '@angular/core';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AvalaibleYearsService } from '@services/avalaibleYears.service';
// import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import APP_ROUTES from './app/app.routes';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeDe, 'de-DE');

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(APP_ROUTES),
		importProvidersFrom(BrowserModule, FormsModule, ReactiveFormsModule),
		AvalaibleYearsService,
		provideHttpClient(withInterceptorsFromDi()),
		{ provide: LOCALE_ID, useValue: 'de-DE' }
	]
}).catch((err) => console.error(err));
