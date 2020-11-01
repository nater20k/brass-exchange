import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';

const routes: Routes = [
  {
    path: '',
    component: MarketplaceComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'instruments',
    loadChildren: () => import('./marketplace/instruments/instruments.module').then((m) => m.InstrumentsModule),
  },
  {
    path: 'services',
    loadChildren: () => import('./marketplace/services/services.module').then((m) => m.ServicesModule),
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
