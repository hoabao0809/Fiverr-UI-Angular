import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    children: [
      {
        path: 'order-details/:idBookedJob/:typePackage',
        loadChildren: () =>
          import('./order-details/order-details.module').then(
            (m) => m.OrderDetailsModule
          ),
          data: { preload: true } 
        // data: { breadcrumb: 'Order Details' },
      },
      {
        path: 'confirm-pay/:idBookedJob/:totalAmount',
        loadChildren: () =>
          import('./confirm-pay/confirm-pay.module').then(
            (m) => m.ConfirmPayModule
          ),
          data: { preload: true } 
        // data: { breadcrumb: 'Confirm & Pay' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
