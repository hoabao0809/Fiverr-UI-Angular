import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CourseManagerComponent } from './course-manager/course-manager.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { ModalCourseManagerComponent } from './modal-course-manager/modal-course-manager.component';
import { ModalUserManagerComponent } from './modal-user-manager/modal-user-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/_core/shares/material-module';


@NgModule({
  declarations: [
    DashboardComponent,
    CourseManagerComponent,
    UserManagerComponent,
    ModalCourseManagerComponent,
    ModalUserManagerComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule 
  ]
})
export class DashboardModule { }
