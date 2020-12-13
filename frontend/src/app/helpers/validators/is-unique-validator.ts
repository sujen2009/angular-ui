import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

// custom validator to check if a field is unique in db
export function IsUniqueValidator(controlName: string, authService: AuthService) {
	return (formGroup: FormGroup) => {
		const control = formGroup.controls[controlName];

		if (control.errors) {
			// return if another validator has already found an error on the matchingControl
			return;
		}
		// // set error on matchingControl if validation fails
		authService.isUnique(controlName, control.value).subscribe(
			(data) => {
				if(data['found']){
					control.setErrors({ notUnique: true });
				}else{
					control.setErrors(null);
				}
			},
		);
	};
}
