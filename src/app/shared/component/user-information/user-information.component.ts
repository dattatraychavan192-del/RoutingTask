import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from '../../model/user';
import { UserServiceService } from '../../servcie/user-service.service';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { SnackbarService } from '../../servcie/snackbar.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
})
export class UserInformationComponent implements OnInit {
  userID!: string;
  userObj!: Iuser;

  IsineditMode: boolean = false;

  userImage: string = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  constructor(
    private _userService: UserServiceService,
    private _roter: Router,
    private _routes: ActivatedRoute,
    private _matDialog: MatDialog,
    private _snackbar: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.getSingleUserData();
  }

  getSingleUserData(): void {
    this.userID = this._routes.snapshot.paramMap.get('id') ?? '';

    if (!this.userID) {
      console.error('User ID not found in route');
      return;
    }

    this._userService.getUserById(this.userID).subscribe({
      next: (res: Iuser) => {
        this.userObj = res;
      },
      error: (err) => {
        console.error('Failed to fetch user:', err);
      },
    });
  }

  editUser() {
    this._roter.navigate(['/user-form', this.userID, 'edit']);
    this.IsineditMode = true;
  }

  deleteData(): void {
    if (!this.userID) {
      this._snackbar.snackbar('User ID not found');
      return;
    }

    const config = new MatDialogConfig<string>();
    config.data = 'Are you sure you want to remove this user?';
    config.width = '400px';
    config.disableClose = true;

    const dialogRef = this._matDialog.open(GetConfirmComponent, config);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed !== true) {
        return;
      }

      this._userService.removeUser(this.userID).subscribe({
        next: (res) => {
          this._snackbar.snackbar(
            `User delete successfully with Id ${res.name}`,
          );

          this._roter.navigate(['/user-dashboard']);
        },
        error: (err) => {
          console.error('Delete error:', err);
          this._snackbar.snackbar('Failed to remove user');
        },
      });
    });
  }
}
