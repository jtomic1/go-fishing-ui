import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Boat } from 'src/models/boat';
import { BoatService } from '../../services/boat.service';

@Component({
  selector: 'app-boat-gallery-visitor',
  templateUrl: './boat-gallery-visitor.component.html',
  styleUrls: ['./boat-gallery-visitor.component.css']
})
export class BoatGalleryVisitorComponent implements OnInit {

  @Input() ownerId:number;

  boats:Boat[];

  constructor(private boatService:BoatService,private router:Router) { }

  ngOnInit(): void {
    
      this.boatService.findBoatsByOwner(this.ownerId).subscribe(data =>{
        this.boats = data;
      });
    
    
  }

  
}
