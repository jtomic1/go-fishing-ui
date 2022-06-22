import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cottage } from 'src/models/cottage';
import { CottageService } from '../../services/cottage.service';

@Component({
  selector: 'app-cottage-gallery-visitor',
  templateUrl: './cottage-gallery-visitor.component.html',
  styleUrls: ['./cottage-gallery-visitor.component.css']
})
export class CottageGalleryVisitorComponent implements OnInit {

  @Input() ownerId:number;

  cottages:Cottage[];

  constructor(private cottageService:CottageService,private router:Router) { }

  ngOnInit(): void {
    
      this.cottageService.findCottagesByOwner(this.ownerId).subscribe(data =>{
        this.cottages = data;
      });
    
    
  }
  
}
