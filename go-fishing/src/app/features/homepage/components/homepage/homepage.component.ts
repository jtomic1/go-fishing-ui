import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StartpageLoginService } from 'src/app/features/startpage/components/startpage-login/startpage-login.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor(
    private userService: StartpageLoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user-role') !== 'ROLE_CLIENT') {
      this.router.navigateByUrl('');
    }
  }

  get userName() {
    return this.userService.userName;
  }
}
