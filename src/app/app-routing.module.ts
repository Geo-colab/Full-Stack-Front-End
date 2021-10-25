import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvertDetailsComponent } from './advert-details/advert-details.component';
import { HomeComponent } from './home/home.component';
import { HomesForSaleComponent } from './homes-for-sale/homes-for-sale.component';
import { ManageMyAccountComponent } from './manage-my-account/manage-my-account.component';

import { MySellerProfileComponent } from './my-seller-profile/my-seller-profile.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './_helpers';
import { Role } from './_models/role.enum';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./Admin/users.module').then(x => x.UsersModule);
const myAdvertsModule = () => import('./my-adverts/my-adverts.module').then(x => x.MyAdvertsModule);

const routes: Routes = [
    { path: '', loadChildren: myAdvertsModule, canActivate: [AuthGuard], data: {roles: [Role.User]} },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard], data: {roles: [Role.Admin]} },
    { path: 'account', loadChildren: accountModule },
    { path: 'home', component: HomeComponent},
    { path: 'homes-for-sale', component: HomesForSaleComponent},
    { path: 'advert-details/:id', component: AdvertDetailsComponent},
    { path: 'manage-my-account', component: ManageMyAccountComponent},
    { path: 'my-seller-profile', component: MySellerProfileComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }