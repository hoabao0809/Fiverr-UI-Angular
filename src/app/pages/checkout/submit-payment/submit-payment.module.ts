import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubmitPaymentRoutingModule } from './submit-payment-routing.module';
import { SubmitPaymentComponent } from './submit-payment.component';


@NgModule({
  declarations: [
    SubmitPaymentComponent
  ],
  imports: [
    CommonModule,
    SubmitPaymentRoutingModule
  ]
})
export class SubmitPaymentModule { }
