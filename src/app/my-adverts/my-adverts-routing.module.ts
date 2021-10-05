import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { MyAdvertsComponent } from '.';
import { AddEditAdvertsComponent } from './add-edit-adverts.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: MyAdvertsComponent },
            { path: 'add', component: AddEditAdvertsComponent },
            { path: 'edit/:id', component: AddEditAdvertsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyAdvertsRoutingModule { }