import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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


  constructor( private formBuilder: FormBuilder,
               private advertService: AdvertService) { }

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

    //Set validators for maxPrice if minPrice is selected      
    this.subForm = this.form.get('minPrice').valueChanges.subscribe(
      (result: string) => {
          if(result !== ''){
               this.form.get('maxPrice').setValidators(Validators.required);
              }
          if(result === ''){
               this.form.get('maxPrice').clearValidators();
              }
              this.form.get('maxPrice').updateValueAndValidity();
          });   

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
    .subscribe((searchResults) => this.advertSearchResults = searchResults);
    console.log(this.advertSearchResults);
  }


}


