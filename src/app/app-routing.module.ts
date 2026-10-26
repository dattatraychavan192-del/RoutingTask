import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './shared/component/user-form/user-form.component';
import { UserDashboardComponent } from './shared/component/user-dashboard/user-dashboard.component';
import { UserInformationComponent } from './shared/component/user-information/user-information.component';
import { ProductComponent } from './shared/component/product/product.component';
import { BlogComponent } from './shared/component/blog/blog.component';

const routes: Routes = [
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: 'user-form',
    component: UserFormComponent,
  },
  {
    path: 'user-form/:id/edit',
    component: UserFormComponent,
  },
  {
    path: 'user/:id',
    component: UserInformationComponent,
  },
  {
    path: 'user-Information',
    component: UserInformationComponent,
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
