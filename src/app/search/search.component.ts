import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from '@app/_models/city';
import { AdvertService } from '@app/_services/advert.service';

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

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  //populate city select on province selection
  getCities() {
    this.advertService.getCitiesByProvinceId(this.f.provinceId.value)
    .subscribe((cities) => {this.cities = cities})
  }

  onSubmit() {
    
  }


}


