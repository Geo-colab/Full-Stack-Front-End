import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Advert } from '@app/_models/advert';
import { AdvertService } from '@app/_services/advert.service';

@Component({
  selector: 'app-advert-details',
  templateUrl: './advert-details.component.html',
  styleUrls: ['./advert-details.component.css']
})
export class AdvertDetailsComponent implements OnInit {
  
  id: string;
  advert;

  constructor( private route: ActivatedRoute,
              private advertService: AdvertService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.advertService.getById(this.id)
        .subscribe(advert => this.advert = advert);
  }

}
