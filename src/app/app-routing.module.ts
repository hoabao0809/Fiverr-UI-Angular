import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // home-template
  {
    path: '',
    loadChildren: () =>
      import('./pages/home-template/home-template.module').then(
        (m) => m.HomeTemplateModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin-template/admin-template.module').then(
        (m) => m.AdminTemplateModule
      ),
  },
  {
    // path: 'checkout/:idBookedJob/:typePackage',
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then((m)=>m.CheckoutModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
