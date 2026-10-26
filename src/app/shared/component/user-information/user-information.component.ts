import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from '../../model/user';
import { UserServiceService } from '../../servcie/user-service.service';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

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
        console.log('Single user data:', res);
        console.log('Skills:', res?.skills);
        console.log('Address:', res?.address);
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
    let config = new MatDialogConfig();
    config.data = 'Are you sure ? you want to remove it!';
    config.width = '400px';
    config.disableClose = true;
    let matdialogRef = this._matDialog.open(GetConfirmComponent, config);
    matdialogRef.afterClosed().subscribe({
      next: (flag) => {
        if (!flag) return;
        this._userService.removeUser(this.userID).subscribe({
          next: () => {
            alert('User removed successfully');
            this._roter.navigate(['/user-dashboard']);
          },
          error: (err) => {
            console.error('Failed to delete user:', err);
          },
        });
      },
    });
  }
}
