import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDasboardComponent } from './admin-dasboard/admin-dasboard.component';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { UserDasboardComponent } from './user-dasboard/user-dasboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'auth', component: AuthComponent },
  { path: 'login', component: LoginComponent},
  { path:'admin', component: AdminDasboardComponent, canActivate: [AuthGuard] },
  { path:'user', component: UserDasboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
