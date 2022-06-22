import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/classes/user';
import { UserService } from 'src/app/shared/services/users-services/user.service';
import { BoatGalleryOwnerComponent } from '../boat-gallery-owner/boat-gallery-owner.component';

@Component({
  selector: 'app-boat-ownerpage',
  templateUrl: './boat-ownerpage.component.html',
  styleUrls: ['./boat-ownerpage.component.css']
})
export class BoatOwnerpageComponent implements OnInit {

  ownerId : number;
  owner : User;
  ownerLoggedIn: boolean;

  constructor(private route : ActivatedRoute,private userService:UserService ) { }

  ngOnInit(): void {
    this.ownerId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.ownerId);
    
    if(!isNaN(this.ownerId)){
      this.userService.findById(this.ownerId).subscribe(user => {
        this.owner = user;
        console.log(user);
        console.log("===========");
        console.log(this.owner);
      });
      
      this.userService.isThisLoggedUser(this.ownerId).subscribe(
        data=>{
          this.ownerLoggedIn = data;
        }
      )
    }

  }

}
