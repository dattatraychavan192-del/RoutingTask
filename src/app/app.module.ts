import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDashboardComponent } from './shared/component/user-dashboard/user-dashboard.component';
import { UserFormComponent } from './shared/component/user-form/user-form.component';
import { UserInformationComponent } from './shared/component/user-information/user-information.component';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './shared/component/product/product.component';
import { BlogComponent } from './shared/component/blog/blog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GetConfirmComponent } from './shared/component/get-confirm/get-confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthInterceptor } from './interceptors/auth.interceptor.srvice';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    UserFormComponent,
    UserInformationComponent,
    NavbarComponent,
    ProductComponent,
    BlogComponent,
    GetConfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
