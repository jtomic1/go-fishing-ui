import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { User } from 'src/app/shared/classes/user';
import {
  MessageService,
  MessageType,
} from 'src/app/shared/services/message-service/message.service';
import { UserService } from 'src/app/shared/services/users-services/user.service';
import { AdventureService } from '../../adventure.service';
import { Adventure } from '../../classes/adventure';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-adventure-add-new',
  templateUrl: './adventure-add-new.component.html',
  styleUrls: ['./adventure-add-new.component.css'],
})
export class AdventureAddNewComponent implements OnInit {
  nameError: boolean = false;
  promoError: boolean = false;
  maxNumError: boolean = false;
  streetError: boolean = false;
  bioError: boolean = false;
  priceError: boolean = false;
  cityError: boolean = false;
  countryError: boolean = false;

  adventure = new Adventure({
    name: '',
    promoDescription: '',
    price: 0,
    capacity: 0,

    equipment: '',
    rulesOfConduct: '',
    rulesOfCancelation: '',
    moreInfo: '',

    street: '',
    city: '',
    country: '',
    latitude: '',
    longitude: '',

    instructorId: 0,
    instructorBiography: '',
    instructorName: '',
    instructorSurname: '',
    deleted: false,
    rating: 0,
  });

  instructorId: number;
  instructor: User = new User();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private adventureService: AdventureService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user-role') !== 'ROLE_INSTRUCTOR') {
      this.router.navigateByUrl('');
    } else {
      if (this.router.url.split('/')[1] !== localStorage.getItem('user-id')) {
        this.router.navigateByUrl(
          'adventureAddNew/' + localStorage.getItem('user-id')
        );
      }
    }
    this.instructorId = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(this.instructorId)) {
      this.userService.findById(this.instructorId).subscribe((user) => {
        this.instructor = user;
        this.adventure.instructorId = this.instructorId;
        this.adventure.instructorName = this.instructor.name;
        this.adventure.instructorSurname = this.instructor.lastName;
      });
    }

    let loader = new Loader({
      apiKey: 'AIzaSyAPNK7vqFqOCb5Lu1B0j--zFj4ws4czwGQ',
    });

    loader.load().then(() => {
      const map = document.getElementById('map') as HTMLElement;
      const googleMap = new google.maps.Map(map, {
        center: { lat: 45.245081, lng: 19.848036 },
        zoom: 14,
      });
      const marker = new google.maps.Marker({
        position: { lat: 45.245081, lng: 19.848036 },
        map: googleMap,
      });
      // Configure the click listener.
      googleMap.addListener('click', (mapsMouseEvent: { latLng: any }) => {
        console.log(
          JSON.stringify(mapsMouseEvent.latLng).slice(2, -1).split(',')
        );
        this.adventure.latitude = JSON.stringify(mapsMouseEvent.latLng)
          .slice(2, -1)
          .split(',')[0]
          .split(':')[1];
        this.adventure.longitude = JSON.stringify(mapsMouseEvent.latLng)
          .slice(2, -1)
          .split(',')[1]
          .split(':')[1];
        marker.setPosition(
          new google.maps.LatLng(
            Number(this.adventure.latitude),
            Number(this.adventure.longitude)
          )
        );
      });
    });
  }

  addAdventure() {
    if (!this.CheckForErrors()) {
      this.adventure.equipment = this.adventure.equipment.split(/\r?\n/).join("|");
      this.adventure.rulesOfConduct = this.adventure.rulesOfConduct.split(/\r?\n/).join("|");
      console.log(this.adventure);
      this.adventureService.addAdventure(this.adventure).subscribe(data => {
        this.messageService.showMessage("Uspešno dodata nova avantura", MessageType.SUCCESS);
      });
      this.adventure = this.getEmptyAdventure();
    }
  }

  CheckForErrors(): boolean {
    var nameErr = this.nameHasError();
    var promoErr = this.promoHasError();
    var capacityErr = this.maxNumHasError();
    var steetErr = this.streetHasError();
    var cityErr = this.cityHasError();
    var countryErr = this.countryHasError();
    var locationErr = this.locationHasError();
    var bioErr = this.bioHasError();
    var priceErr = this.priceHasError();

    if (
      nameErr ||
      locationErr ||
      promoErr ||
      capacityErr ||
      steetErr ||
      cityErr ||
      countryErr ||
      bioErr ||
      priceErr
    ) {
      return true;
    } else {
      return false;
    }
  }

  locationHasError(): boolean {
    if (this.adventure.latitude == '' || this.adventure.longitude == '') {
      this.messageService.showMessage(
        'Morate uneti lokaciju na mapi',
        MessageType.ERROR
      );
      return true;
    }

    return false;
  }

  countryHasError() {
    if (this.adventure.country === '') {
      this.countryError = true;
      return true;
    }
    return false;
  }
  cityHasError() {
    if (this.adventure.city === '') {
      this.cityError = true;
      return true;
    }
    return false;
  }

  priceHasError(): boolean {
    if (this.adventure.price === 0) {
      this.priceError = true;
      return true;
    }
    return false;
  }
  bioHasError(): boolean {
    if (this.adventure.instructorBiography === '') {
      this.bioError = true;
      return true;
    }
    return false;
  }
  streetHasError(): boolean {
    if (this.adventure.street === '') {
      this.streetError = true;
      return true;
    }
    return false;
  }
  maxNumHasError(): boolean {
    if (this.adventure.capacity === 0) {
      this.maxNumError = true;
      return true;
    }
    return false;
  }
  promoHasError(): boolean {
    if (this.adventure.promoDescription === '') {
      this.promoError = true;
      return true;
    }
    return false;
  }

  nameHasError(): boolean {
    if (this.adventure.name === '') {
      this.nameError = true;
      return true;
    }
    return false;
  }

  getEmptyAdventure(): Adventure {
    var newAdventure = new Adventure({
      name: '',
      promoDescription: '',
      price: 0,
      capacity: 0,

      equipment: '',
      rulesOfConduct: '',
      rulesOfCancelation: '',
      moreInfo: '',

      street: '',
      city: '',
      country: '',
      latitude: '',
      longitude: '',

      instructorId: 0,
      instructorBiography: '',
      instructorName: '',
      instructorSurname: '',
      deleted: false,
      rating: 0,
    });
    return newAdventure;
  }
}
