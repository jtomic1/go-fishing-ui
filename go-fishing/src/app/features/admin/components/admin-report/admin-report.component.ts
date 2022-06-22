import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { ReservationService } from 'src/app/shared/services/reservation-service/reservation.service';
import { ReservationDTO } from 'src/models/reservation';
import { AdminService } from '../../admin.service';
import { EarningsPercentage } from '../../classes/EarningPercentage';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.css']
})
export class AdminReportComponent implements OnInit {

  form: FormGroup = this.generateForm();
  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });
  earningsPercentage: EarningsPercentage = new EarningsPercentage();
  displayChart: boolean = false;
  displayData: boolean = false;
  reservations: ReservationDTO[] = [];
  earned: number = 0;
  x_axis:string;
  y_axis:string;
  data: any = [];
  title = 'Rezervacije';
  adminId: number;

  constructor(private adminService: AdminService,
              private messageService: MessageService,
              private reservationService: ReservationService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.adminId = Number(this.route.snapshot.paramMap.get('id'));
    this.adminService.getEarningPercentage().subscribe(data => {
      this.earningsPercentage = data;
    });
  }

  generateForm() : FormGroup {
    return new FormGroup({
      percentage: new FormControl('')
    });
  }

  editPercentage() {
    if (this.form.valid) {
      this.adminService.setNewEarningPercentage(this.form.get('percentage')?.value).subscribe(data => {
        this.earningsPercentage = data;
        this.messageService.showMessage('Procenat zarade usnešno izmenjen!', MessageType.SUCCESS);
      })
    }
    else {
      this.messageService.showMessage('Unesite novu vrednost!', MessageType.WARNING);
    }
  }

  showReport() {
    if (this.range.value.start !== null && this.range.value.end !== null) {
      console.log(this.range.value);
      this.earned = 0;
      this.data = [];
      this.displayData = false;
      this.displayChart = false;
      this.reservationService.getReservationsByDateRange(this.range.value).subscribe(async data => {
        this.reservations = data;
        console.log(this.reservations);
        await this.delay(500);
        for (let ii = 0; ii < this.reservations.length; ii++) {
          this.earned += this.countEarned(this.reservations[ii].totalPrice);
          this.data.push({name: (ii+1) + " " + this.reservations[ii].getStartDateString(), value: this.reservations[ii].totalPrice});          
        }
        console.log(this.data);
        await this.delay(500);
        this.displayChart = true;
        this.displayData = true;
      });
    } 
    else {
      this.messageService.showMessage('Unesite ispravan datum!', MessageType.WARNING);
    }
  }

  countEarned(price: number): number {
    return price * this.earningsPercentage.percentage / 100;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
