import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthComponent} from "./auth/auth.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UploadComponent} from "./upload/upload.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'reg', component: RegistrationComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
