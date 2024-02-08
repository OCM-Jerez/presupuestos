import { enableProdMode, importProvidersFrom } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import APP_ROUTES from './app/app.routes';
import { HighchartsChartModule } from 'highcharts-angular';

registerLocaleData(localeDe, 'de-DE');

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(APP_ROUTES, withComponentInputBinding(), withViewTransitions()),
		importProvidersFrom(BrowserModule, FormsModule, ReactiveFormsModule, HighchartsChartModule),
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy
		},
		AvalaibleYearsService,
		provideHttpClient(withInterceptorsFromDi()),
		{ provide: LOCALE_ID, useValue: 'de-DE' }
	]
}).catch((err) => console.error(err));
