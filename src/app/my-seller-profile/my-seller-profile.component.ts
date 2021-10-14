import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  seller: Seller;

  constructor( private formBuilder: FormBuilder,
              private alertService: AlertService,
              private accountService: AccountService) { 
                this.users = this.accountService.userValue; 
               }

  ngOnInit(): void {
    this.accountService.getSellerByUserId(this.users.id)
    .subscribe(x => {
      this.f.email.setValue(x.email);
      this.f.phone.setValue(x.phone);
      this.f.id.setValue(x.id);
      this.f.userId.setValue(x.userId)
   });     

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],

      id: [''],
      userId: ['']
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
      this.updateSeller();
  }

  private updateSeller() {
    this.accountService.updateSeller(this.f.id.value, this.form.value)
        .subscribe(
            data => {
                
                this.alertService.success('Update successful');
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}
  
  

}
