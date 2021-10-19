import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';
import { AccountService, AlertService } from '@app/_services';
import { Subscription } from 'rxjs';

//Validate new password confirm
 function newPasswordMatcher(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

@Component({
  selector: 'app-manage-my-account',
  templateUrl: './manage-my-account.component.html',
  styleUrls: ['./manage-my-account.component.css']
})
export class ManageMyAccountComponent implements OnInit {
  user: User;
  form: FormGroup;
  loading = false;
  submitted = false;
  private subForm: Subscription;

  constructor(
      private formBuilder: FormBuilder,
      private accountService: AccountService,
      private alertService: AlertService,
  ) {  this.user = this.accountService.userValue; console.log(this.user.password) }

  ngOnInit() {

      this.form = this.formBuilder.group({
          firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
          lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
          username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.email]],
          password: [''],
          newPassword: [''],
          confirmNewPassword: [''],
      },
      { validator: newPasswordMatcher('newPassword', 'confirmNewPassword')});

          this.accountService.getById(this.user.id)
              .subscribe(x => {
                  this.f.firstName.setValue(x.firstName);
                  this.f.lastName.setValue(x.lastName);
                  this.f.username.setValue(x.username);   
               });  
        
        //Set validators for new password if password is entered       
        this.subForm = this.form.get('password').valueChanges.subscribe(
            (result: string) => {
                if(result !== ''){
                     this.form.get('newPassword').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(100)] );
                     this.form.get('confirmNewPassword').setValidators(Validators.required);
                    }
                if(result === ''){
                     this.form.get('newPassword').clearValidators();
                     this.form.get('confirmNewPassword').clearValidators();
                    }
                    this.form.get('newPassword').updateValueAndValidity();
                    this.form.get('confirmNewPassword').updateValueAndValidity();
                });   
  }

  ngOnDestroy(): void {
          
    this.subForm.unsubscribe();
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
      this.updateUser();
  }

  private updateUser() {
      this.accountService.update(this.user.id, this.form.value)
          .subscribe(
              data => {
                  console.log(this.user.id)
                  this.alertService.success('Update successful');
                  this.loading = false;
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

}
