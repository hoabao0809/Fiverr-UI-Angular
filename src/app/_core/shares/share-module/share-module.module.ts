import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobCardComponent } from 'src/app/components/job-card/job-card.component';
import { ModalLoginComponent } from 'src/app/pages/home-template/_components/modal-login/modal-login.component';
import { FormsModule } from '@angular/forms';
import { ModalSignupComponent } from 'src/app/pages/home-template/_components/modal-signup/modal-signup.component';
import { SeperationSectionComponent } from 'src/app/components/seperation-section/seperation-section.component';
import { MaterialModule } from '../material-module';



@NgModule({
  declarations: [JobCardComponent, ModalLoginComponent, ModalSignupComponent, SeperationSectionComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [JobCardComponent, ModalLoginComponent, ModalSignupComponent, SeperationSectionComponent]
})
export class ShareModuleModule { }
