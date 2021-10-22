import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/_models';
import { Advert } from '@app/_models/advert';
import { AdvertState } from '@app/_models/advert-state.enum';
import { City } from '@app/_models/city';
import { AccountService, AlertService } from '@app/_services';
import { AdvertService } from '@app/_services/advert.service';


@Component({
  selector: 'app-add-edit-adverts',
  templateUrl: './add-edit-adverts.component.html',
})
export class AddEditAdvertsComponent implements OnInit {
    id: string;
    form: FormGroup;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    provinces = null;
    cities: City[] = [];
    users: User;
  
    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private advertService: AdvertService,
      private alertService: AlertService,
      private accountService: AccountService
    
    ) { 
    this.users = this.accountService.userValue;
    }

    ngOnInit(): void {

      this.id = this.route.snapshot.params['id'];
      this.isAddMode = !this.id;
   
      this.form = this.formBuilder.group({
        advertHead: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
        provinceId: ['', [Validators.required]],
        cityId: ['', [Validators.required]],
        advertDetails: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
        price: ['',  [Validators.required, Validators.min(10000.00), Validators.max(100000000.00)]],
      
        id: [''],
        advertState: ['']

    });

    if (!this.isAddMode) {
      this.advertService.getById(this.id)
        .subscribe(x => {
            this.f.advertHead.setValue(x.advertHead);
            this.f.provinceId.setValue(x.provinceId);
            this.f.cityId.setValue(x.cityId);
            this.f.advertDetails.setValue(x.advertDetails);
            this.f.price.setValue(x.price);
            
            this.f.id.setValue(x.id);
            this.f.advertState.setValue(x.advertState);
            console.log(x);
            this.getCities();
        });
    
      }

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
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      if (this.isAddMode) {
          this.createAdvert();
      } else {
          this.updateAdvert();
      }
  }

  private createAdvert() {
      var advert = new Advert();
      advert.advertHead = this.f.advertHead.value;
      advert.advertDetails = this.f.advertDetails.value;
      advert.price = this.f.price.value;
      advert.provinceId = this.f.provinceId.value;
      advert.cityId = this.f.cityId.value;
      advert.advertState = AdvertState.Live;
      advert.userId = this.users.id;

      this.advertService.createAdvert(advert)
          .subscribe(
              data => {
                  this.alertService.success('Advert added successfully', { keepAfterRouteChange: true });
                  this.router.navigate(['.']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

  private updateAdvert() {
    this.advertService.updateAdvert(this.id, this.form.value)
        .subscribe(
            data => {
                this.alertService.success('Advert Published Successfully', { keepAfterRouteChange: true });
                this.router.navigate(['..', { relativeTo: this.route }]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}
}

