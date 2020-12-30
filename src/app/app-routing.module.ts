import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HowToUseComponent } from './how-to-use/how-to-use.component';
import { PwaTestingComponent } from "./pwa-testing/pwa-testing.component";


const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'toolbar', component:ToolBarComponent},
  {path:'product', component:ManageProductComponent},
  {path:'how', component:HowToUseComponent},
  {path:'pwa', component: PwaTestingComponent},
  {path:'**', component:NotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
