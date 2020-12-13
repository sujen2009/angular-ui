import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

import { MustMatchValidator } from 'src/app/helpers/validators/must-match.validator';
import { InvalidEmailValidator } from 'src/app/helpers/validators/invalid-email.validator';
import { IsUniqueValidator } from 'src/app/helpers/validators/is-unique-validator';


@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	loading = false;
	submitted = false;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private authService: AuthService,
		private alertService: AlertService
	) { }

	ngOnInit() {
		this.registerForm = this.formBuilder.group(
			{
				firstName: ['', [Validators.required]],
				lastName: ['', [Validators.required]],
				userName: ['', [Validators.required, Validators.minLength(4)]],
				password: ['', [Validators.required, Validators.minLength(8)]],
				confirmPassword: ['', [Validators.required]],
				email: ['', [Validators.required]],
				phoneNumber: ['', [Validators.required]]
			},
			{
				validator: [
					MustMatchValidator('password', 'confirmPassword'),
					InvalidEmailValidator('email'),
					IsUniqueValidator('userName', this.authService),
					IsUniqueValidator('email', this.authService),
				]
			}
		);
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.registerForm.controls;
	}

	onRegisterSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.registerForm.invalid) {
			return;
		}

		this.loading = true;

		//Post now to the register api
		this.authService.register(this.registerForm.value).subscribe(
			(data) => {
				this.alertService.success(data['message'], true);
				this.loading = false;
				this.router.navigate(['/login']);
			},
			(error) => {
				this.alertService.error(error);
				this.loading = false;
				this.router.navigate(['/register']);
			}
		);
	}
}
