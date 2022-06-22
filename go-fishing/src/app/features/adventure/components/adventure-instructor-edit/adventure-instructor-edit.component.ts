import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { User } from 'src/app/shared/classes/user';
import {
  MessageService,
  MessageType,
} from 'src/app/shared/services/message-service/message.service';
import { UserService } from 'src/app/shared/services/users-services/user.service';
import { AdventureService } from '../../adventure.service';
import { Instructor } from '../../classes/instructor';

@Component({
  selector: 'app-adventure-instructor-edit',
  templateUrl: './adventure-instructor-edit.component.html',
  styleUrls: ['./adventure-instructor-edit.component.css'],
})
export class AdventureInstructorEditComponent implements OnInit {
  nameError: boolean = false;
  surnameError: boolean = false;
  streetError: boolean = false;
  cityError: boolean = false;
  countryError: boolean = false;
  phoneError: boolean = false;
  passwordError: boolean = false;
  confirmPasswordError: boolean = false;
  locationError: boolean = false;

  password = '';
  confirmPassword = '';
  longitude = '';
  latitude = '';

  instructorId: number;
  instructor: User = new User();
  instructorOld: User = new User();

  constructor(
    private adventureService: AdventureService,
    private route: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user-role') !== 'ROLE_INSTRUCTOR') {
      this.router.navigateByUrl('');
    } else {
      if (this.router.url.split('/')[1] !== localStorage.getItem('user-id')) {
        this.router.navigateByUrl(
          'editInstructor/' + localStorage.getItem('user-id')
        );
      }
    }
    /*
    if (localStorage.getItem('user-role') !== 'ROLE_INSTRUCTOR') {
      this.router.navigateByUrl('');
    } else {
      if (this.router.url.split('/')[1] !== localStorage.getItem('user-id')) {
        this.router.navigateByUrl(
          'adventureAddNew/' + localStorage.getItem('user-id')
        );
      }
    }
    */
    this.instructorId = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(this.instructorId)) {
      this.userService.findById(this.instructorId).subscribe((user) => {
        this.instructor = user;
        this.instructorOld = JSON.parse(JSON.stringify(user));
        console.log(this.instructor);
        let loader = new Loader({
          apiKey: 'AIzaSyAPNK7vqFqOCb5Lu1B0j--zFj4ws4czwGQ',
        });
        this.LoadMap(loader);
      });
    }
  }

  LoadMap(loader: Loader) {
    loader.load().then(() => {
      const map = document.getElementById('map') as HTMLElement;
      const googleMap = new google.maps.Map(map, {
        center: {
          lat: Number(this.instructor.latitude),
          lng: Number(this.instructor.longitude),
        },
        zoom: 16,
      });
      const marker = new google.maps.Marker({
        position: {
          lat: Number(this.instructor.latitude),
          lng: Number(this.instructor.longitude),
        },
        map: googleMap,
      });
      console.log(this.instructor.latitude);
      console.log(this.instructor.longitude);
      // Configure the click listener.
      googleMap.addListener('click', (mapsMouseEvent: { latLng: any }) => {
        console.log(
          JSON.stringify(mapsMouseEvent.latLng).slice(2, -1).split(',')
        );
        this.locationError = false;
        this.latitude = JSON.stringify(mapsMouseEvent.latLng)
          .slice(2, -1)
          .split(',')[0]
          .split(':')[1];
        this.longitude = JSON.stringify(mapsMouseEvent.latLng)
          .slice(2, -1)
          .split(',')[1]
          .split(':')[1];
        this.instructor.latitude = this.latitude;
        this.instructor.longitude = this.longitude;
        marker.setPosition(
          new google.maps.LatLng(Number(this.latitude), Number(this.longitude))
        );
      });
    });
  }

  UpdateData() {
    if (!this.CheckForErrors()) {
      this.adventureService
        .updateInstructorData(this.instructor)
        .subscribe((data) => {
          this.messageService.showMessage(
            'Podaci uspešno izmenjeni',
            MessageType.SUCCESS
          );
        });
    }
  }

  ChangePassword() {
    var passwordErr = this.passwordHasError();
    var confirmPasswordErr = this.confirmPasswordHasError();
    if (!passwordErr && !confirmPasswordErr) {
      this.adventureService
        .changePassword(this.instructorId, {
          newPassword: this.password,
          confirmNewPassword: this.confirmPassword,
        })
        .subscribe((data) => {
          this.messageService.showMessage(
            'Lozinka uspešno izmenjena',
            MessageType.SUCCESS
          );
        });
    }
  }

  CheckForErrors(): boolean {
    var nameErr = this.nameHasError();
    var surnameErr = this.surnameHasError();
    var streetErr = this.streetHasError();
    var cityErr = this.cityHasError();
    var countryErr = this.countryHasError();
    var phoneErr = this.phoneHasError();
    var locationErr = this.locationHasError();
    if (
      nameErr ||
      surnameErr ||
      cityErr ||
      streetErr ||
      countryErr ||
      phoneErr ||
      locationErr
    ) {
      return true;
    } else {
      return false;
    }
  }

  locationHasError(): boolean {
    console.log(this.instructor);
    console.log(this.instructorOld);
    if (
      this.instructor.street == this.instructorOld.street &&
      this.instructor.city == this.instructorOld.city &&
      this.instructor.country == this.instructorOld.country
    ) {
      if (this.latitude != '' || this.longitude != '') {
        this.locationError = true;
        this.messageService.showMessage(
          'Lokacije nisu sinhronizovane!',
          MessageType.ERROR
        );
        return true;
      }
    } else {
      if (this.latitude == '' && this.longitude == '') {
        this.locationError = true;
        this.messageService.showMessage(
          'Lokacije nisu sinhronizovane!',
          MessageType.ERROR
        );
        return true;
      }
    }

    return false;
  }
  nameHasError(): boolean {
    if (this.instructor.name === '') {
      this.nameError = true;
      return true;
    }
    return false;
  }
  surnameHasError(): boolean {
    if (this.instructor.lastName === '') {
      this.surnameError = true;
      return true;
    }
    return false;
  }
  streetHasError(): boolean {
    if (this.instructor.street === '') {
      this.streetError = true;
      return true;
    }
    return false;
  }
  cityHasError(): boolean {
    if (this.instructor.city === '') {
      this.cityError = true;
      return true;
    }
    return false;
  }
  countryHasError(): boolean {
    if (this.instructor.country === '') {
      this.countryError = true;
      return true;
    }
    return false;
  }
  phoneHasError(): boolean {
    if (this.instructor.phone === '') {
      this.phoneError = true;
      return true;
    } else if (
      this.instructor.phone.slice(1).length < 10 ||
      this.instructor.phone.slice(1).length > 12
    ) {
      this.phoneError = true;
      return true;
    }
    return false;
  }
  passwordHasError(): boolean {
    if (this.password.length < 8 || this.password.length > 30) {
      this.passwordError = true;
      return true;
    }
    return false;
  }
  confirmPasswordHasError(): boolean {
    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = true;
      return true;
    }
    return false;
  }
}
