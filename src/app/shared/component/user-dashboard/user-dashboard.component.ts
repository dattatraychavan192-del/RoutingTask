import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../servcie/user-service.service';
import { Iuser } from '../../model/user';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  constructor(private _userService: UserServiceService) {}

  userArr: Iuser[] = [];

  ngOnInit(): void {
    this.fetchUserArr();
  }

  fetchUserArr(): void {
    this._userService.fetchData().subscribe({
      next: (res) => {
        for (const key in res) {
          this.userArr.push({ ...res[key], id: key });
        }
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
