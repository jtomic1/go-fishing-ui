import { Component, Input, OnInit, Output } from '@angular/core';
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FreePeriodDTO,
  FreePeriodSendDTO,
} from '../../../../models/freePeriod';
import { FreePeriodService } from '../../services/free-period-service/free-period.service';
import { EventEmitter } from 'stream';
import { MessageService, MessageType } from '../../services/message-service/message.service';

@Component({
  selector: 'app-new-free-period',
  templateUrl: './new-free-period.component.html',
  styleUrls: ['./new-free-period.component.css'],
})
export class NewFreePeriodComponent implements OnInit {
  offerId: number;
  freePeriod: FreePeriodDTO;
  startDate: string;

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  today: NgbDate;
  offer: Object;
  offerType: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private freePeriodService: FreePeriodService,
    private messageService:MessageService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.today = calendar.getToday();
  }

  ngOnInit(): void {
    this.offerId = Number(this.route.snapshot.paramMap.get('id'));
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }

  addNewFreePeriod() {
    if (this.fromDate != undefined && this.toDate != undefined) {
      let freePeriod = new FreePeriodSendDTO();
      freePeriod.startDate = this.format(this.fromDate);
      freePeriod.endDate = this.format(this.toDate);
      freePeriod.offerId = this.offerId;


      this.freePeriodService
        .addNewFreePeriod(freePeriod)
        .subscribe((response) => {
          this.router.navigate(['/calendar/' + this.offerId]);
          this._pData.callParentMethod();
          this.messageService.showMessage("Uspešno ste dodali period dostupnosti.",MessageType.SUCCESS);
        });
    } else {
      this.messageService.showMessage("Niste lepo odabrali datume.",MessageType.WARNING);
    }
  }
  @Input() _pData!: any;

  format(date: NgbDate | null): string {
    let stringDate: string = '';
    if (date != null) {
      stringDate += date.year + '-';
      stringDate += date.month
        ? date.month < 10
          ? '0' + date.month + '-'
          : date.month + '-'
        : '01-';
      stringDate += date.day
        ? date.day < 10
          ? '0' + date.day
          : date.day
        : '01';
      stringDate += 'T00:00:00';
    }
    return stringDate;
  }
}
