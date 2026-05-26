import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { ViewComponent } from './resume/view/view.component';
import { FormComponent } from './resume/form/form.component';
import { FormLayoutComponent } from './section/form-layout/form-layout.component';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'resume/view',
    component: ViewComponent
  },
  {
    path: 'resume/form',
    component: FormComponent
  },
  {
    path: 'newForm',
    component: FormLayoutComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

export default routes;