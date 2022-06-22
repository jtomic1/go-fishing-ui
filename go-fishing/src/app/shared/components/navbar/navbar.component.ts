import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faBackwardStep,
  faHouseChimney,
  faIdCard,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';
import { StartpageLoginService } from 'src/app/features/startpage/components/startpage-login/startpage-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  loginIcon = faArrowRightToBracket;
  registerIcon = faUser;
  homeIcon = faHouseChimney;
  logoutIcon = faArrowRightFromBracket;
  profileIcon = faIdCard;
  startPageIcon = faBackwardStep;

  showLoginButton = true;
  showRegisterButton = true;
  showHomeButton = true;

  constructor(
    private router: Router,
    private loginService: StartpageLoginService
  ) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        switch (event.url) {
          case '/':
            this.homeClicked();
            break;
          case '/login':
          case '/register':
            this.loginOrRegClicked();
            break;
          default:
            break;
        }
      });
  }

  get showLogoutButton() {
    return localStorage.getItem('jwt') !== null;
  }

  get showProfileButton() {
    if (this.loginService.getRole() === 'ROLE_USER')
      return this.router.url !== '/home/userProfile';
    else if (this.loginService.getRole() === 'ROLE_COTTAGE_OWNER')
      return this.router.url !== '/cottageOwner/' + this.loginService.getId();
    else if (this.loginService.getRole() === 'ROLE_BOAT_OWNER')
      return this.router.url !== '/boatOwner/' + this.loginService.getId();
    else if (this.loginService.getRole() === 'ROLE_INSTRUCTOR')
      return (
        this.router.url !== '/instructorProfile/' + this.loginService.getId()
      );
    else return false;
  }

  get showStartPageButton() {
    return this.router.url !== '/' && localStorage.getItem('jwt') !== null;
  }

  ngOnInit(): void {
    this.showHomeButton = false;
  }

  loginOrRegClicked() {
    this.showLoginButton = false;
    this.showRegisterButton = false;
    this.showHomeButton = true;
  }

  homeClicked() {
    this.showLoginButton = true;
    this.showRegisterButton = true;
    this.showHomeButton = false;
  }

  logout() {
    this.loginService.logout();
  }

  showProfile() {
    if (this.loginService.getRole() === 'ROLE_USER')
      this.router.navigateByUrl('home/userProfile');
    else if (this.loginService.getRole() === 'ROLE_COTTAGE_OWNER')
      this.router.navigateByUrl('cottageOwner/' + this.loginService.getId());
    else if (this.loginService.getRole() === 'ROLE_BOAT_OWNER')
      this.router.navigateByUrl('boatOwner/' + this.loginService.getId());
    else if (this.loginService.getRole() === 'ROLE_INSTRUCTOR')
      this.router.navigateByUrl(
        'instructorProfile/' + this.loginService.getId()
      );
  }

  showStartPage() {
    this.router.navigateByUrl('');
  }
}
