import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileClientComponent } from './profile-client.component';

const routes: Routes = [
  {
    path:'',
    component: ProfileClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileClientRoutingModule { }
