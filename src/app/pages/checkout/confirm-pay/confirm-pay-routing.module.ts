import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmPayComponent } from './confirm-pay.component';

const routes: Routes = [
  {
    path: '',
    component: ConfirmPayComponent,
    data: {breadcrumb: 'Confirm & Pay'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmPayRoutingModule {}
