import { Routes } from '@angular/router';

import { createUserRoute } from 'app/enroll/create-user/create-user.route';

const ENROLL_ROUTES = [createUserRoute];

export const enrollState: Routes = [
  {
    path: '',
    children: ENROLL_ROUTES,
  },
];
