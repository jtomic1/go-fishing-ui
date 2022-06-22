import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { PasswordChangeDialog } from './components/userprofile/change-password-dialog/password-change-dialog.component';
import { LoyaltyDialogComponent } from './components/userprofile/loyalty-dialog/loyalty-dialog.component';
import { DeletionRequestDialogComponent } from './components/userprofile/deletion-request-dialog/deletion-request-dialog.component';
import { EntityListComponent } from './components/entity-list/entity-list.component';
import { SearchDialogComponent } from './components/entity-list/search-dialog/search-dialog.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { CancelReservationDialogComponent } from './components/reservation-list/cancel-reservation-dialog/cancel-reservation-dialog.component';
import { ReviewReservationDialogComponent } from './components/reservation-list/review-reservation-dialog/review-reservation-dialog.component';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';

@NgModule({
  declarations: [
    HomepageComponent,
    UserprofileComponent,
    PasswordChangeDialog,
    LoyaltyDialogComponent,
    DeletionRequestDialogComponent,
    EntityListComponent,
    SearchDialogComponent,
    ReservationListComponent,
    CancelReservationDialogComponent,
    ReviewReservationDialogComponent,
    SubscriptionListComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule, ReactiveFormsModule],
})
export class HomepageModule {}
