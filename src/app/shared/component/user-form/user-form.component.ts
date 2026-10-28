import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from '../../model/user';
import { UserServiceService } from '../../servcie/user-service.service';
import { SnackbarService } from '../../servcie/snackbar.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  loginForm!: FormGroup;

  IsineditMode: boolean = false;

  constructor(
    private _userService: UserServiceService,
    private _routes: ActivatedRoute,
    private _route: Router,
    private _snackbar: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.formSUbmit();
    this.addSkill();
    this.checkboxEnable();
    this.patchAdd();
    const userId = this._routes.snapshot.params['id'];
    if (userId) {
      this.IsineditMode = true;
      this._userService.getUserById(userId).subscribe({
        next: (user) => this.patchData(user),
      });
    }
  }

  checkboxEnable() {
    this.loginForm.get('address.currentAddress')?.valueChanges.subscribe(() => {
      let currentAdd = this.loginForm.get('address.currentAddress');
      let checkbox = this.loginForm.get('sameAdd');
      if (currentAdd?.valid) {
        checkbox?.enable();
      } else {
        checkbox?.disable();
      }
    });
  }

  patchAdd() {
    this.loginForm.get('sameAdd')?.valueChanges.subscribe((checked) => {
      if (checked) {
        let current = this.loginForm.get('address.currentAddress')?.value;

        this.loginForm.get('address.permanentAddress')?.patchValue(current);
        this.loginForm.get('address.permanentAddress')?.disable();
      } else {
        this.loginForm.get('address.permanentAddress')?.enable();
        this.loginForm.get('address.permanentAddress')?.reset();
      }
    });
  }

  patchData(user: Iuser) {
    let userId = this._routes.snapshot.params['id'];
    this.skills.clear();
    for (const skill of user.skills) {
      this.skills.push(new FormControl(skill, Validators.required));
    }

    this.loginForm.patchValue({
      ...user,
      permanentAdd: user.address.permanentAddress,
    });
    // if (userId) {
    //   this.IsineditMode = true;

    //   this._userService.getUserById(userId).subscribe({
    //     next: (res) => {

    //       this.loginForm.patchValue(res);
    //     },
    //   });
    // }
  }

  formSUbmit() {
    this.loginForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      role: new FormControl(null, Validators.required),
      experience: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      skills: new FormArray([]),
      address: new FormGroup({
        currentAddress: new FormGroup({
          country: new FormControl(null, Validators.required),
          state: new FormControl(null, Validators.required),
          city: new FormControl(null, Validators.required),
          zipcode: new FormControl(null, Validators.required),
        }),
        permanentAddress: new FormGroup({
          country: new FormControl(null, Validators.required),
          state: new FormControl(null, Validators.required),
          city: new FormControl(null, Validators.required),
          zipcode: new FormControl(null, Validators.required),
        }),
      }),
      sameAdd: new FormControl({ value: false, disabled: true }),
      imageUrl: new FormControl(null),
    });
  }

  get controls() {
    return this.loginForm.get('controls') as FormControl;
  }

  get addresscontrol() {
    this.loginForm.get('address') as FormGroup;
    return;
  }
  get currentaddresscontrol() {
    this.loginForm.get('address') as FormControl;
    return;
  }
  get permanentaddresscontrol() {
    this.loginForm.get('address') as FormControl;
    return;
  }

  get skills() {
    return this.loginForm.get('skills') as FormArray;
  }

  submitForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      `             `;
      let user: Iuser = this.loginForm.getRawValue();
      console.log(user);

      this._userService.postUser(user).subscribe({
        next: (res) => {
          this.loginForm.reset();
          this._route.navigate(['/user-dashboard']);
          this._snackbar.snackbar(`New user add successfully...`);
        },
      });
    }
  }

  addSkill(): void {
    if (this.skills.valid) {
      this.skills.push(new FormControl('', Validators.required));
    }
  }

  removeSkill(id: number) {
    this.skills.removeAt(id);
  }

  updateData() {
    let userId = this._routes.snapshot.params['id'];
    if (this.loginForm.valid) {
      let user: Iuser = this.loginForm.getRawValue();
      this._userService.updateUser(user, userId).subscribe({
        next: (res) => {
          this.loginForm.reset();
          this.IsineditMode = false;
          console.log(res);
          this._route.navigate(['/user-dashboard']);
          this._snackbar.snackbar(`User update successfully...`);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
