import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { Role } from './_models/role.enum';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }
    
    get isUser() {
        return this.user && this.user.role === Role.User;
    }

    get isAdmin() {
        return this.user && this.user.role === Role.Admin;
    }
    
    logout() {
        this.accountService.logout();
    }
}