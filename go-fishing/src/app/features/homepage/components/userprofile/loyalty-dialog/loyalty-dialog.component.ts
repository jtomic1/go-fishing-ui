import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoyaltyService } from 'src/app/shared/services/loyalty-service/loyalty.service';

@Component({
  selector: 'app-loyalty-dialog',
  templateUrl: './loyalty-dialog.component.html',
  styleUrls: ['./loyalty-dialog.component.css'],
})
export class LoyaltyDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LoyaltyDialogComponent>,
    private loyaltyService: LoyaltyService
  ) {}

  loyalties: any;
  ngOnInit(): void {
    this.loyaltyService.getLoyalties().subscribe((res) => {
      this.loyalties = res;
    });
  }

  onExitClick() {
    this.dialogRef.close();
  }
}
