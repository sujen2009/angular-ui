import { Component } from '@angular/core';
import { AlertService } from './services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  user: any;

  constructor(
    private alertService: AlertService,
    private router: Router,
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onLogout() {
    localStorage.removeItem('user');
    this.alertService.success('Logged out succesfully!', true);
    this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });
  }
}
