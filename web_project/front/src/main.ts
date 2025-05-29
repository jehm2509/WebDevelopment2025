/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '@/app.config';
import { AppComponent } from '@/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from '@/core/interceptors/AuthInterceptor';


bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));