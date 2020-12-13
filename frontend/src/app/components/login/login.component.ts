import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	loading = false;
	submitted = false;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private authService: AuthService,
		private alertService: AlertService,
	) { }

	ngOnInit() {
		this.loginForm = this.formBuilder.group(
			{
				userName: ['', [Validators.required, Validators.minLength(4)]],
				password: ['', [Validators.required, Validators.minLength(8)]],
			}
		);
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.loginForm.controls;
	}

	onLoginSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.loginForm.invalid) {
			return;
		}

		this.loading = true;
		this.authService.login(this.loginForm.value).subscribe(
			(data) => {
				this.alertService.success(data['message'], true);
				this.router.navigate(['/dashboard'])
					.then(() => {
						window.location.reload();
					});
			},
			(error) => {
				this.alertService.error(error);
				this.loading = false;
				this.router.navigate(['/login']);
			}
		);
	}
}
