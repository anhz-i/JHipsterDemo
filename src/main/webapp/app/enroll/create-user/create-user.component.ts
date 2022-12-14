import { CreateUserService } from 'app/enroll/create-user/create-user.service';

import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';

@Component({
  selector: 'jhi-create-user',
  templateUrl: './create-user.component.html',
})
export class CreateUserComponent implements AfterViewInit {
  @ViewChild('login', { static: false })
  login?: ElementRef;

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;

  registerForm = this.fb.group({
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(20), Validators.pattern('^[0-9]*$')]],
    // password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    // confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });

  constructor(private translateService: TranslateService, private createUserService: CreateUserService, private fb: FormBuilder) {}

  ngAfterViewInit(): void {
    if (this.login) {
      this.login.nativeElement.focus();
    }
  }

  register(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;

    const login = this.registerForm.get(['login'])!.value;
    const email = this.registerForm.get(['email'])!.value;
    const phone = this.registerForm.get(['phone'])!.value;
    this.createUserService.save({ login, email, phone, langKey: this.translateService.currentLang }).subscribe(
      () => (this.success = true),
      response => this.processError(response)
    );
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = true;
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }
}
