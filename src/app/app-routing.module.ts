import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { HomeComponent } from 'src/app/home/home.component';
import { AuthGuard } from 'src/app/services/auth.guard'
import { EmailVerificationComponent } from '../app/email-verification/email-verification.component';
import { PostLoginPageComponent } from '../app/post-login-page/post-login-page.component';
import { TimelineComponent } from './timeline/timeline.component';

const routes: Routes = [
  {path:'', component: HomeComponent, canActivate:[AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'emailVerify', component: EmailVerificationComponent},
  {path:'postLog', component: PostLoginPageComponent},
  {path:'timeline', component:TimelineComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
