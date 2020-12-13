import { FormGroup } from '@angular/forms';

// custom validator to check if the email address is valid
export function InvalidEmailValidator(controlName: string) {
	return (formGroup: FormGroup) => {
		const control = formGroup.controls[controlName];

		if (control.errors) {
			// return if another validator has already found an error on the matchingControl
			return;
		}

		// set error on matchingControl if validation fails
		if (!control.value.match('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')) {
			control.setErrors({ invalidEmail: true });
		} else {
			control.setErrors(null);
		}
	};
}
