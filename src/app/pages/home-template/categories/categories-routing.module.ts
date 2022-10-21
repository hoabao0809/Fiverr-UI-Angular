import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    children: [
      {
        path: ':idCategory',
        loadChildren: () =>
          import('./list-categories/list-categories.module').then(
            (m) => m.ListCategoriesModule
          ),
      },
      {
        path: 'search/:keyword',
        loadChildren: () =>
          import('./search-page/search-page.module').then(
            (m) => m.SearchPageModule
          ),
      },
      {
        path: 'subjobs-list/:idSubjob',
        loadChildren: () =>
          import('./subtype-job-list/subtype-job-list.module').then(
            (m) => m.SubtypeJobListModule
          ),
      },
      {
        path: 'detail-job/:idDetailJob',
        loadChildren: () =>
          import('./job-detail/job-detail.module').then(
            (m) => m.JobDetailModule
          ),
      },
      {
        path: 'profile-client/:idClient',
        loadChildren: () =>
          import('./profile-client/profile-client.module').then(
            (m) => m.ProfileClientModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
