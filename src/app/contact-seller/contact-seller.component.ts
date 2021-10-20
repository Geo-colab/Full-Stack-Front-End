import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';
import { Seller } from '@app/_models/seller';
import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'app-contact-seller',
  templateUrl: './contact-seller.component.html',
  styleUrls: ['./contact-seller.component.css']
})
export class ContactSellerComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  emailSent = false;
  user: User;
  seller: Seller;
  
  constructor( private formBuilder: FormBuilder,
               private alertService: AlertService,
               private accountService: AccountService ) {
                this.user = this.accountService.userValue;
                }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.email]],
      phone: ['', [Validators.minLength(0), Validators.maxLength(100), Validators.pattern("^[0-9]*$")]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]]
  });

  this.accountService.getSellerByUserId(this.user.id)
        .subscribe(seller => this.seller = seller)
   
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
    this.emailSent = true;
    this.form.reset();
    this.submitted = false;

  }
  
}
