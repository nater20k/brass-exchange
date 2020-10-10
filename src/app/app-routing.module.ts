import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketplaceComponent } from './marketplace/marketplace.component';

const routes: Routes = [
  {
    path: '',
    component: MarketplaceComponent
  },
  { path: 'instruments', loadChildren: () => import('./marketplace/instruments/instruments.module').then(m => m.InstrumentsModule) },
  { path: 'services', loadChildren: () => import('./marketplace/services/services.module').then(m => m.ServicesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
