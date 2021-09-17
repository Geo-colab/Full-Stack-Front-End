import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { MyAdvertsComponent } from './my-adverts';
import { AuthGuard } from './_helpers';
import { Role } from './_models/role.enum';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./Admin/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '', component: MyAdvertsComponent, canActivate: [AuthGuard], data: {roles: [Role.User]} },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard], data: {roles: [Role.Admin]} },
    { path: 'account', loadChildren: accountModule },
    {path: 'home', component: HomeComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }