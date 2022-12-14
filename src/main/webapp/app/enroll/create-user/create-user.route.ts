import { Route } from '@angular/router';

import { CreateUserComponent } from './create-user.component';

export const createUserRoute: Route = {
  path: 'create-user',
  component: CreateUserComponent,
  data: {
    pageTitle: 'create-user.title',
  },
};
