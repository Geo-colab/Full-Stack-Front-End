import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/_models';
import { Advert } from '@app/_models/advert';
import { Seller } from '@app/_models/seller';
import { AccountService } from '@app/_services';
import { AdvertService } from '@app/_services/advert.service';

@Component({
  selector: 'app-advert-details',
  templateUrl: './advert-details.component.html',
  styleUrls: ['./advert-details.component.css']
})
export class AdvertDetailsComponent implements OnInit {
  
  id: string;
  advert: Advert;
  user: User;
  seller: Seller;

  constructor( private route: ActivatedRoute,
              private advertService: AdvertService,
              private accountService: AccountService) { 
                this.user = this.accountService.userValue;
              }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.advertService.getById(this.id)
        .subscribe(advert => this.advert = advert);

    this.accountService.getSellerByUserId(this.user.id)
        .subscribe(seller => this.seller = seller)
  }

    

}
