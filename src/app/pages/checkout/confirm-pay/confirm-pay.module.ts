import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmPayRoutingModule } from './confirm-pay-routing.module';
import { ConfirmPayComponent } from './confirm-pay.component';
import { MaterialModule } from 'src/app/_core/shares/material-module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConfirmPayComponent
  ],
  imports: [
    CommonModule,
    ConfirmPayRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class ConfirmPayModule { }
