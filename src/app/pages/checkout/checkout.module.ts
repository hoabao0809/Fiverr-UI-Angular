import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { FormsModule } from '@angular/forms';
import { ShareModuleModule } from 'src/app/_core/shares/share-module/share-module.module';
import {BreadcrumbModule} from 'angular-crumbs';


@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ShareModuleModule,
    FormsModule,
    BreadcrumbModule
  ]
})
export class CheckoutModule { }
