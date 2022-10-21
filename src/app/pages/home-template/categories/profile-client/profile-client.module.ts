import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileClientRoutingModule } from './profile-client-routing.module';
import { ProfileClientComponent } from './profile-client.component';
import { BookedGigComponent } from './booked-gig/booked-gig.component';
import { ModalUpdateUserComponent } from './modal-update-user/modal-update-user.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/_core/shares/material-module';


@NgModule({
  declarations: [
    ProfileClientComponent,
    BookedGigComponent,
    ModalUpdateUserComponent
  ],
  imports: [
    CommonModule,
    ProfileClientRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class ProfileClientModule { }
