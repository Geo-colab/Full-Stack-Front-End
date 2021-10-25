import { Component, OnInit } from '@angular/core';
import { Advert } from '@app/_models/advert';
import { AdvertService } from '@app/_services/advert.service';

@Component({
  selector: 'app-homes-for-sale',
  templateUrl: './homes-for-sale.component.html',
  styleUrls: ['./homes-for-sale.component.css']
})
export class HomesForSaleComponent implements OnInit {
  
  adverts = null;
  
  constructor(private advertService: AdvertService) { }

  ngOnInit(): void {
    this.advertService.getAllAdverts()
    .subscribe(adverts =>
      {
        this.adverts = adverts.filter(filterAdvert => filterAdvert.advertState === 'Live');
      });
  }

  searchResults(advertResults: Advert[]) {
     this.adverts = [];
     this.adverts = [...advertResults].filter(filterAdvert => filterAdvert.advertState === 'Live');
     console.log(this.adverts);
  }

}
