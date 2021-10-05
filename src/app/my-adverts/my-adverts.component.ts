import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersModule } from '@app/Admin/users.module';

import { User } from '@app/_models';
import { Advert } from '@app/_models/advert';
import { AdvertState } from '@app/_models/advert-state.enum';
import { Province } from '@app/_models/province';
import { AccountService, AlertService } from '@app/_services';
import { AdvertService } from '@app/_services/advert.service';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'my-adverts.component.html' })
export class MyAdvertsComponent {
    users: User;
    adverts: Advert[];
    provinces: Province[];
    loading = false;
    
    
    constructor(private accountService: AccountService,
                private advertService: AdvertService,
                private alertService: AlertService) {
        this.users = this.accountService.userValue;
    }

    ngOnInit() {

        //EK kry nie die twee gelink dat hy die town en province wys inplaas van die id's op die list nie.
       
        this.advertService.getAdvertsByUserId(this.users.id)
            .pipe(first())
            .subscribe(adverts => this.adverts = adverts.filter(filterAdvert => filterAdvert.advertState == 'Live' || filterAdvert.advertState == 'Hidden' ))
        
        this.advertService.getAllProvinces()
            .pipe(first())
            .subscribe(provinces => this.provinces = provinces);      
    }

    public hideAdvertStatus (advert : Advert) {
        var advertUpdate = new Advert();
        advertUpdate.id = advert.id;
        advertUpdate.advertHead = advert.advertHead;
        advertUpdate.advertDetails = advert.advertDetails;
        advertUpdate.price = advert.price;
        advertUpdate.provinceId = advert.provinceId;
        advertUpdate.cityId = advert.cityId
        advertUpdate.userId = this.users.id
        advertUpdate.advertState = AdvertState.Hide;
        
        this.advertService.updateAdvert(advertUpdate.id, advertUpdate)
        .pipe(first())
        .subscribe(
            data => {
                window.location.reload();
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    public showAdvertStatus (advert : Advert) {
        var advertUpdate = new Advert();
        advertUpdate.id = advert.id;
        advertUpdate.advertHead = advert.advertHead;
        advertUpdate.advertDetails = advert.advertDetails;
        advertUpdate.price = advert.price;
        advertUpdate.provinceId = advert.provinceId;
        advertUpdate.cityId = advert.cityId
        advertUpdate.userId = this.users.id
        advertUpdate.advertState = AdvertState.Live;
        
        this.advertService.updateAdvert(advertUpdate.id, advertUpdate)
        .pipe(first())
        .subscribe(
            data => {
                window.location.reload();
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    public deleteAdvert (advert : Advert) {
        var advertUpdate = new Advert();
        advertUpdate.id = advert.id;
        advertUpdate.advertHead = advert.advertHead;
        advertUpdate.advertDetails = advert.advertDetails;
        advertUpdate.price = advert.price;
        advertUpdate.provinceId = advert.provinceId;
        advertUpdate.cityId = advert.cityId
        advertUpdate.userId = this.users.id
        advertUpdate.advertState = AdvertState.Deleted;
       
        if(confirm(`Are you sure you want to delete ${advertUpdate.advertHead}?`)) {
            this.advertService.updateAdvert(advertUpdate.id, advertUpdate)
        .pipe(first())
        .subscribe(
            data => {
                window.location.reload();
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
        }

    }
        

}