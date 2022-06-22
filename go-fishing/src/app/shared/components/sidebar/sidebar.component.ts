import { Component, Input, OnInit } from '@angular/core';
import {
  faBell,
  faClipboardCheck,
  faClockRotateLeft,
  faEnvelope,
  faHouse,
  faPeopleGroup,
  faSailboat,
  faUser,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() userName: string;
  userProfileIcon = faUser;
  cottageIcon = faHouse;
  boatIcon = faSailboat;
  instructorIcon = faPeopleGroup;
  activeReservationsIcon = faClipboardCheck;
  historyIcon = faClockRotateLeft;
  penaltyIcon = faWarning;
  subscriptionsIcon = faBell;
  complaintsIcon = faEnvelope;

  constructor() {}

  ngOnInit(): void {}
}
