import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTemplateComponent } from './home-template.component';

const routes: Routes = [
  {
    path: '',
    component: HomeTemplateComponent,
    // data: {breadcrumb: { skip: true }},
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
        data: { breadcrumb: 'Fiverr' },
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
        data: { breadcrumb: true, text: 'Categories' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTemplateRoutingModule {}
