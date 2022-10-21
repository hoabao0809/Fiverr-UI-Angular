import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDetailsRoutingModule } from './order-details-routing.module';
import { OrderDetailsComponent } from './order-details.component';
import { FormsModule } from '@angular/forms';
import { ShareModuleModule } from 'src/app/_core/shares/share-module/share-module.module';


@NgModule({
  declarations: [
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    OrderDetailsRoutingModule,
    FormsModule,
    ShareModuleModule,

  ]
})
export class OrderDetailsModule { }
