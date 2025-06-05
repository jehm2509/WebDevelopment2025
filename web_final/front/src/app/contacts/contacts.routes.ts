import { Routes } from '@angular/router';

import { ROUTES } from '@/core/constants/routes.constants';
import { ListContacts } from '@/contacts/list-contacts/list-contacts';

export const contactRoutes: Routes = [
    {path: ROUTES.CONTACTS, component: ListContacts}
];
