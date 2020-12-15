import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  NgForm,
  FormControl,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @ViewChild('form') signupFormDirective: NgForm;
  signupForm: FormGroup;
  maxDate: Date;
  age = 0;
  image: File;
  username;
  imageName;
  usernameAlreadyExist;
  mobileAlreadyExist;
  mobile;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private uploadService: UploadService
  ) {
    this.maxDate = new Date();
  }

  formErrors = {
    username: '',
    name: '',
    password: '',
    mobile_Number: '',
    date_Of_Birth: '',
  };

  validationMessages = {
    username: {
      required: 'Email is required',
      pattern: 'Valid email is required'
    },
    name: {
      required: 'Name is required',
    },
    password: {
      required: 'Password is required',
    },
    mobile_Number: {
      required: 'Mobile number is required',
      pattern: 'Mobile number starts with 6 or above is required',
    },
    date_Of_Birth: {
      required: 'Mobile number is required',
    },
  };

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group({
      username: ['',[Validators.required, Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/),]],
      password: ['', Validators.required],
      name: ['', [Validators.required]],
      mobile_Number: ['',[Validators.required, Validators.pattern(/^[6-9]\d{9}$/)],],
      date_Of_Birth: ['', Validators.required],
      age: new FormControl({ value: '', disabled: true }),
      image: []
    });
    this.signupForm.valueChanges.subscribe((data) => {
      this.onValueChanges(data);
    });
    this.onValueChanges();
  }

  validateUsername(username) {
    this.authService.checkUserName(username).subscribe((resp) => {
      if (resp.success == true) this.validateMobile(this.mobile);
      else alert('Already registered username');
    });
  }
  validateMobile(mobile) {
    this.authService.checkMobileNumber(Number(mobile)).subscribe((resp) => {
      console.log(resp.success);
      if (resp.success == true) this.sendData();
      else alert('Already registered mobile');
    });
  }

  uploadImage(event) {
    this.image = event.target.files[0];
    this.imageName = event.target.files[0].name;
  }

  onValueChanges(Data?: any) {
    var age = Date.now() - this.signupForm.value.date_Of_Birth;
    this.age = Math.floor(age / 31536000000);
    this.signupForm.value.age = this.age;
    if (!this.signupForm) return;
    const form = this.signupForm; 
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  Submit() {
    this.validateUsername(this.username);
  }

  sendData() {
    var form = this.signupForm.value;
    form.date_Of_Birth = new Date(form.date_Of_Birth).toISOString();
    var image = this.signupForm.value.image;
    form.image = image.name;
    var uploadData = new FormData();
    uploadData.append('image', image, image.name);
    this.authService.userSignUp(form).subscribe((resp) => {
      if (resp.success == true) {
        this.uploadService.profileImageUpload(uploadData).subscribe((resp) => {
          console.log(resp);
          this.router.navigate(['login']);
        });
      } else {
        window.alert('Failed to sign up');
      }
    });
  }
}
