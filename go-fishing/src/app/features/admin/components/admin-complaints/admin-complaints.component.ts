import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComplaintService } from 'src/app/shared/services/complaint-service/complaint.service';
import { MessageService } from 'src/app/shared/services/message-service/message.service';
import { ComplaintDTO } from 'src/models/complaint';

@Component({
  selector: 'app-admin-complaints',
  templateUrl: './admin-complaints.component.html',
  styleUrls: ['./admin-complaints.component.css']
})
export class AdminComplaintsComponent implements OnInit {

  adminId: number;
  complaints: ComplaintDTO[] = [];


  constructor(private route: ActivatedRoute,
              private complaintService: ComplaintService) { }

  ngOnInit(): void {
    this.adminId = Number(this.route.snapshot.paramMap.get('id'));
    this.complaintService.getComplaints().subscribe(data => {
      this.complaints = data;
      console.log(this.complaints);
    })
  }

}
