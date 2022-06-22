import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CottageProfilepageComponent } from './components/cottage-profilepage/cottage-profilepage.component';
import { CottageOwnerpageComponent } from './components/cottage-ownerpage/cottage-ownerpage.component';
import { CottageGalleryOwnerComponent } from './components/cottage-gallery-owner/cottage-gallery-owner.component';
import { RouterModule } from '@angular/router';
import { CottageAddNewComponent } from './components/cottage-add-new/cottage-add-new.component';
import { CottageService } from './services/cottage.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CottageEditComponent } from './components/cottage-edit/cottage-edit.component';
import { BoatEntityService } from './services/boat-entity.service';
import { CottageReportsComponent } from './components/cottage-reports/cottage-reports.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CottageClientReservationDialogComponent } from './components/cottage-client-reservation-dialog/cottage-client-reservation-dialog.component';
import { CottageGalleryVisitorComponent } from './components/cottage-gallery-visitor/cottage-gallery-visitor.component';
import { CottageActionConfirmDialogComponent } from './components/cottage-action-confirm-dialog/cottage-action-confirm-dialog.component';

@NgModule({
  declarations: [
    CottageProfilepageComponent,
    CottageOwnerpageComponent,
    CottageGalleryOwnerComponent,
    CottageAddNewComponent,
    CottageEditComponent,
    CottageReportsComponent,
    CottageClientReservationDialogComponent,
    CottageGalleryVisitorComponent,
    CottageActionConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [CottageService, BoatEntityService],
})
export class CottageModule {}
