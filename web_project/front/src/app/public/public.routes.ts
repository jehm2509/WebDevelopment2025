import { Routes } from '@angular/router';

import { ROUTES } from '@/core/constants/routes.constants';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';

export const publicRoutes: Routes = [
    {path: ROUTES.HOME, component: HomeComponent},
    {path: ROUTES.CALENDAR, component: CalendarComponent}
];
