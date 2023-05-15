import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthComponent} from "./auth/auth.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UploadComponent} from "./upload/upload.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'reg', component: RegistrationComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
