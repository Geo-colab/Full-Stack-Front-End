import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MyAdvertsRoutingModule } from './my-adverts-routing.module';
import { LayoutComponent } from './layout.component';
import { MyAdvertsComponent } from '.';
import { AddEditAdvertsComponent } from './add-edit-adverts.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MyAdvertsRoutingModule
    ],
    declarations: [
        LayoutComponent,
        MyAdvertsComponent,
        AddEditAdvertsComponent
    ]
})
export class MyAdvertsModule { }