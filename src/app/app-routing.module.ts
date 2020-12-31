import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: MarketplaceComponent,
    canActivate: [AuthGuard],
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
  {
    path: 'profile',
    component: ProfileComponent,
  },
  { path: 'messages', loadChildren: () => import('./messsage/messsage.module').then((m) => m.MesssageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
