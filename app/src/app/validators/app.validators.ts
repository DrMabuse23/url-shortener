import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function urlValidator(control: AbstractControl) {
  const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
  if (control.value !== '') {
    const isValid = regex.test(control.value);
    return isValid ? null : { urlValidator: true };
  } else {
    return null;
  }
}
