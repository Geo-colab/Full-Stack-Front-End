import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { User } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users = null;
    

    constructor(private accountService: AccountService) {  console.log(this.users);}

    ngOnInit() {
        this.accountService.getAll()
            .subscribe(users => this.users = users);   
    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .subscribe(() => {
                this.users = this.users.filter(x => x.id !== id) 
            });
    }

    
}