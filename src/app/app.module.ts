import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AuthInterceptor } from './services/auth.interceptor';
import { ImageRenderComponent } from './image-render/image-render.component';
import { ImageEditorComponent } from './image-editor/image-editor.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { MatListModule } from "@angular/material/list";
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { CustomInputEditorComponent } from "../app/manage-product/manage-product.component";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import {MatStepperModule} from '@angular/material/stepper';
import { HowToUseComponent } from './how-to-use/how-to-use.component';
import { authentication } from './services/authentication';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PwaTestingComponent } from './pwa-testing/pwa-testing.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    ImageRenderComponent,
    ImageEditorComponent,
    ToolBarComponent,
    ManageProductComponent,
    CustomInputEditorComponent,
    NotFoundComponent,
    HowToUseComponent,
    PwaTestingComponent
  ],
  imports: [
    MatNativeDateModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    Ng2SmartTableModule,
    MatListModule,
    MatStepperModule,
    NgxMatFileInputModule,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register('service-worker.js', { enabled: environment.production })
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true},
  {provide: LocationStrategy, useClass: HashLocationStrategy},
{provide: authentication, useFactory:authentication}],
  bootstrap: [AppComponent],
})
export class AppModule { }
