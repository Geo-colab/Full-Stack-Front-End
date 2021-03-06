import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Advert } from '@app/_models/advert';
import { City } from '@app/_models/city';
import { PriceInterval } from '@app/_models/price-interval';
import { AdvertService } from '@app/_services/advert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: []
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  provinces = null;
  cities: City[] = [];
  minPrices = null;
  maxPrices: PriceInterval[] = [];
  private subForm: Subscription;
  advertSearchResults: Advert[] = [];
  
  @Output() searchResults: EventEmitter<any> = new EventEmitter;

  constructor( private formBuilder: FormBuilder,
               private advertService: AdvertService,
               private router: Router,) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      provinceId: ['', Validators.required],
      cityId: [''],
      minPrice: [''],
      maxPrice: [''],
      keyword: [''],
    });

    this.advertService.getAllProvinces()
    .subscribe((provinces) => {this.provinces = provinces;
                              console.log(provinces)}); 

    this.advertService.getAllPriceIntervals()
    .subscribe((minPrices) => {this.minPrices = minPrices;})
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  //populate city select on province selection
  getCities() {
    this.advertService.getCitiesByProvinceId(this.f.provinceId.value)
    .subscribe((cities) => {this.cities = cities})
  }

  getMaxPrices() {
    console.log(this.f.minPrice.value)
    this.advertService.getAllPriceIntervals()
    .subscribe((maxPrices) => {
      this.maxPrices = maxPrices.filter(maxPrices => {   
        return maxPrices.priceIntervalValue >= this.f.minPrice.value})
    });
  }


  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
   this.SearchAdverts();
  }

  SearchAdverts() {
    this.advertService.getSearchedAdverts(this.form.value)
    .subscribe(searchResults => 
      {this.advertSearchResults = searchResults;
        this.searchResults.emit(this.advertSearchResults);
        this.router.navigate(['homes-for-sale']);
      });
    console.log(this.advertSearchResults)
  }

  
}


