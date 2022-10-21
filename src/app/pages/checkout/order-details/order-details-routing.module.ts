import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from './order-details.component';

const routes: Routes = [
  {
    path:'',
    component: OrderDetailsComponent,
    data: {breadcrumb: 'Order Details'},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDetailsRoutingModule { }
