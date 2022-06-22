import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { elementAt } from 'rxjs';
import { LoyaltyService } from 'src/app/shared/services/loyalty-service/loyalty.service';
import { Loyalty } from 'src/models/loyalty';
import { AddLoyaltyComponent } from './add-loyalty/add-loyalty.component';
import { EditLoyaltyComponent } from './edit-loyalty/edit-loyalty.component';

@Component({
  selector: 'app-admin-loyalty-program',
  templateUrl: './admin-loyalty-program.component.html',
  styleUrls: ['./admin-loyalty-program.component.css']
})
export class AdminLoyaltyProgramComponent implements OnInit {

  adminId: number;
  loyalties: Loyalty[] = [];
  constructor(private route: ActivatedRoute,
              private loyaltyService: LoyaltyService,
              private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.adminId = Number(this.route.snapshot.paramMap.get('id'));
    this.loyaltyService.getLoyalties().subscribe((res) => {
      this.loyalties = res as Loyalty[];
      this.loyalties.sort((a, b) => (a.minPoints < b.minPoints ? -1 : 1 ));
    });
  }

  editLoyaltyDialog(id: number, rankName: string, minPoints: number, maxPoints: number, discountRate: number, pointsPerReservation: number) {
    let dialog = this.dialog.open(EditLoyaltyComponent, {
      data: {id: id, rankName: rankName, minPoints: minPoints, maxPoints: maxPoints, discountRate: discountRate, pointsPerReservation: pointsPerReservation},
      disableClose: true
    });

    dialog.afterClosed().subscribe(data => {
      if (data !== null) {
        this.loyalties.forEach((element, index)=>{
          if(element.id == data.id) {
            element.minPoints = data.minPoints;
            element.maxPoints = data.maxPoints;
            element.discountRate = data.discountRate;
            element.rankName = data.rankName;
          }
        });
        this.loyalties.sort((a, b) => (a.minPoints < b.minPoints ? -1 : 1 ));
      }
    });
  }

  addLoyaltyDialog() {
    let dialog = this.dialog.open(AddLoyaltyComponent, {
      disableClose: true
    });

    dialog.afterClosed().subscribe(data => {
      if (data !== null) {
        this.loyalties.push(data);
        this.loyalties.sort((a, b) => (a.minPoints < b.minPoints ? -1 : 1 ));
      }
    });
  }

}
