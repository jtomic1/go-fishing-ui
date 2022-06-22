import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/classes/user';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { UserService } from 'src/app/shared/services/users-services/user.service';
import { AdventureService } from '../../adventure.service';
import { Adventure } from '../../classes/adventure';

@Component({
  selector: 'app-adventure-instructorpage',
  templateUrl: './adventure-instructorpage.component.html',
  styleUrls: ['./adventure-instructorpage.component.css']
})
export class AdventureInstructorpageComponent implements OnInit {

  isInstructor: boolean = true;

  instructorId: number;
  instructor: User = new User();
  adventures: Adventure[];
  adventuresInitial: Adventure[];
  adventuresFiltered: Adventure[];
  form: FormGroup = new FormGroup({
    searchNameBar: new FormControl(''),
    searchLocationBar: new FormControl('')
  });
  deletionForm: FormGroup = this.createDeletionForm();

  //For mat-sliders
  minPrice: number = 0;
  maxPrice: number = 10000;
  minCapacity: number = 0;
  maxCapacity: number = 10000;
  price: number = -1;
  capacity: number = -1;

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private adventureService: AdventureService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.instructorId = Number(this.route.snapshot.paramMap.get('id'));

    var newMinPrice = 0;
    var newMaxPrice = 10000;
    var newMinCapacity = 0;
    var newMaxCapacity = 10000;
    
    if(!isNaN(this.instructorId)){
      this.userService.findById(this.instructorId).subscribe(user => {
        this.instructor = user;

      this.adventureService.getAdventuresOfInstructor(this.instructorId).subscribe(adventures => {
        this.adventures = adventures;
        this.adventuresInitial = JSON.parse(JSON.stringify(adventures));

        for (let ii = 0; ii < this.adventures.length; ii++) {
          if (ii === 0) {
            newMinPrice = this.adventures[ii].price;
            newMaxPrice = this.adventures[ii].price;
            newMinCapacity = this.adventures[ii].capacity;
            newMaxCapacity = this.adventures[ii].capacity;
          }
          else {
            if (newMinPrice > this.adventures[ii].price) {
              newMinPrice = this.adventures[ii].price;
            } else if (newMaxPrice < this.adventures[ii].price) {
              newMaxPrice = this.adventures[ii].price;
            }

            if (newMinCapacity > this.adventures[ii].capacity) {
              newMinCapacity = this.adventures[ii].capacity;
            } else if (newMaxCapacity < this.adventures[ii].capacity) {
              newMaxCapacity = this.adventures[ii].capacity;
            }
          }
        }

        this.minPrice = Math.round(newMinPrice);
        this.maxPrice = Math.round(newMaxPrice);
        this.minCapacity = newMinCapacity;
        this.maxCapacity = newMaxCapacity;
      })
      })
    }
  }

  DeleteProfile() {
    if (this.deletionForm.getRawValue().deletionReason.length < 10){
      this.messageService.showMessage('Unesite bar 10 karaktera!', MessageType.WARNING);
      return;
    }
    else {
      this.adventureService.sendDeletionRequest(this.instructorId, this.deletionForm.getRawValue()).subscribe(data => {
          this.messageService.showMessage('Zahtev uspešno poslat!', MessageType.SUCCESS);
        });
    }
  }

  createDeletionForm(): FormGroup {
    return new FormGroup({
      deletionReason: new FormControl('', Validators.required),
    });
  }

  OnAdventureDeleted(id: string) {
    document.getElementById(id)?.remove();
  }

  ChangeList() {
    this.adventures = this.adventures.slice(0, -1);
  }

  onKeyupNameEvent(event: any) {
    this.adventuresFiltered = [];
    this.adventures = this.adventuresInitial;
    console.log(event.target.value);
    if (event.target.value === '') {
      this.adventures = this.adventuresInitial;
    } else {
      for (let ii = 0; ii < this.adventures.length; ii++) {
        if (this.adventures[ii].name.toLowerCase().includes(event.target.value.toLowerCase())){
          this.adventuresFiltered.push(this.adventures[ii]);
        }
      }
      this.adventures = this.adventuresFiltered;
    }
  }

  onKeyupLocationEvent(event: any) {
    this.adventuresFiltered = [];
    this.adventures = this.adventuresInitial;
    var location = document.getElementById('location') as HTMLInputElement;
    console.log(location.value);
    console.log(event.target.value);
    if (event.target.value === '') {
      this.adventures = this.adventuresInitial;
    } else {
      for (let ii = 0; ii < this.adventures.length; ii++) {
        if (this.adventures[ii].street.toLowerCase().includes(event.target.value.toLowerCase())){
          this.adventuresFiltered.push(this.adventures[ii]);
        } else if (this.adventures[ii].city.toLowerCase().includes(event.target.value.toLowerCase())){
          this.adventuresFiltered.push(this.adventures[ii]);
        } else if (this.adventures[ii].country.toLowerCase().includes(event.target.value.toLowerCase())){
          this.adventuresFiltered.push(this.adventures[ii]);
        }
      }
      this.adventures = this.adventuresFiltered;
    }
  }

  priceSliderOnChange(value: number) {
    this.price = value;
    this.search();
    /*
    this.adventuresFiltered = [];
    this.adventures = this.adventuresInitial;
    console.log(this.form.get('price')?.value);
    for (let ii = 0; ii < this.adventures.length; ii++) {
      if (this.adventures[ii].price <= value){
        this.adventuresFiltered.push(this.adventures[ii]);
      }
    }
    this.adventures = this.adventuresFiltered;*/
  }

  capacitySliderOnChange(value: number) {
    this.capacity = value;
    this.search();
    /*
    this.adventuresFiltered = [];
    this.adventures = this.adventuresInitial;
    console.log(value);
    for (let ii = 0; ii < this.adventures.length; ii++) {
      if (this.adventures[ii].capacity <= value){
        this.adventuresFiltered.push(this.adventures[ii]);
      }
    }
    this.adventures = this.adventuresFiltered;*/
  }

  search() {
    var afterName = [];
    var afterLocation = [];
    var afterPrice = [];
    var afterCapacity = [];
    this.adventures = this.adventuresInitial;
    
    var name = document.getElementById('name') as HTMLInputElement;
    var location = document.getElementById('location') as HTMLInputElement;

    if (name.value !== '') {
      for (let ii = 0; ii < this.adventures.length; ii++) { 
        if (this.adventures[ii].name.toLowerCase().includes(name.value.toLowerCase())){
          afterName.push(this.adventures[ii]);
        }
      }
    } else {
      afterName = this.adventures;
    }

    if (location.value !== '') {
      for (let ii = 0; ii < afterName.length; ii++) {
        if (afterName[ii].street.toLowerCase().includes(location.value.toLowerCase())){
          afterLocation.push(afterName[ii]);
        } else if (afterName[ii].city.toLowerCase().includes(location.value.toLowerCase())){
          afterLocation.push(afterName[ii]);
        } else if (afterName[ii].country.toLowerCase().includes(location.value.toLowerCase())){
          afterLocation.push(afterName[ii]);
        }
      }
    } else {
      afterLocation = afterName;
    }

    if (this.price !== -1) {
      for (let ii = 0; ii < afterLocation.length; ii++) {
        if (afterLocation[ii].price <= this.price){
          afterPrice.push(afterLocation[ii]);
        }
      }
    } else {
      afterPrice = afterLocation;
    }

    if (this.capacity !== -1) {
      for (let ii = 0; ii < afterPrice.length; ii++) {
        if (afterPrice[ii].capacity <= this.capacity){
          afterCapacity.push(afterPrice[ii]);
        }
      }
    } else {
      afterCapacity = afterPrice;
    }

    this.adventures = afterCapacity;

  }

}
