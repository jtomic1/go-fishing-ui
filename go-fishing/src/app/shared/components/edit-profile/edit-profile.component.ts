import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})


export class EditProfileComponent implements OnInit {

  form: FormGroup = this.createRegistrationForm();

  activatePassMatchError = false;

  constructor() {}

  ngOnInit(): void {
    this.form.get('password')?.valueChanges.subscribe(() => {
      this.activatePassMatchError =
        String(this.form.get('confirmPassword')!.value) !==
          String(this.form.get('password')!.value) &&
        String(this.form.get('confirmPassword')!.value) !== '';
    });

    this.form.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.activatePassMatchError =
        String(this.form.get('confirmPassword')!.value) !==
          String(this.form.get('password')!.value) &&
        String(this.form.get('confirmPassword')!.value) !== '';
    });
    
  }
  
  
  createRegistrationForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(
        '',
        Validators.pattern('^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$')
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(8), Validators.maxLength(30)])
      ),
      confirmPassword: new FormControl(''),
      name: new FormControl(''),
      surname: new FormControl(''),
      country: new FormControl(''),
      cityTown: new FormControl(''),
      address: new FormControl(''),
      phoneNumber: new FormControl('', Validators.pattern('^[+][0-9]{8,10}$')),
    });
  }


  // TODO: Pozvati metodu iz servisa za slanje POST zahteva
  saveRequest() {
    if (this.form.invalid || this.activatePassMatchError) return;
    else console.log(this.form.getRawValue);
  }
}
