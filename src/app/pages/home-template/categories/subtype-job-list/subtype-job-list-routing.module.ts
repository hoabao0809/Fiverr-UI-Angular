import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubtypeJobListComponent } from './subtype-job-list.component';

const routes: Routes = [
  {
    path: '',
    component: SubtypeJobListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubtypeJobListRoutingModule {}
