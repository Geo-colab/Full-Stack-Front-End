import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/_models';
import { Seller } from '@app/_models/seller';
import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'app-my-seller-profile',
  templateUrl: './my-seller-profile.component.html',
  styleUrls: ['./my-seller-profile.component.css']
})
export class MySellerProfileComponent implements OnInit {
  users: User;
  form: FormGroup;
  loading = false;
  submitted = false;
  isAddMode: boolean;
  seller: Seller;

  constructor( private formBuilder: FormBuilder,
              private alertService: AlertService,
              private accountService: AccountService,
              private router: Router,
              private route: ActivatedRoute,) { 
                this.users = this.accountService.userValue; 
                console.log(this.users);
               }

  ngOnInit(): void {
    this.accountService.getSellerByUserId(this.users.id)
         .subscribe(seller => {
           if (seller === null){
             this.isAddMode = true;
           } else {
             this.isAddMode = false;
             this.f.email.setValue(seller.email);
             this.f.phone.setValue(seller.phone);
             this.f.id.setValue(seller.id);
           }
         })
  
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.email]],
      phone: ['', [Validators.minLength(8), Validators.maxLength(100), Validators.pattern("^[0-9]*$")]],

      id: ['']
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

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
      this.createSeller();
  } else {
      console.log(this.isAddMode)
      this.updateSeller();
  }
    
}
  
private createSeller() {
  console.log("creating seller")
  var seller = new Seller();
    seller.email = this.f.email.value;
    seller.phone = this.f.phone.value;
    seller.userId = this.users.id;
  this.accountService.createSeller(seller)
      .subscribe(
          data => {
            this.alertService.success('Seller Information added successfully', { keepAfterRouteChange: true });
            this.router.navigate(['.']);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
}

  private updateSeller() {
    console.log("updating seller")
    var seller = new Seller();
    seller.id = this.f.id.value;
    seller.email = this.f.email.value;
    seller.phone = this.f.phone.value;
    seller.userId = this.users.id;
    this.accountService.updateSeller(seller.id, seller)
        .subscribe(
            data => {
                
              this.alertService.success('Seller Information Updated Successfully', { keepAfterRouteChange: true });
              this.router.navigate(['..']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}
  
}
