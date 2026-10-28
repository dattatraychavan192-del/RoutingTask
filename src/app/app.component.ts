import { Component, OnInit } from '@angular/core';
import { ServiceService } from './spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'RoutingTask';
  isLoading!: boolean;
  constructor(private _spinnerService: ServiceService) {}

  ngOnInit(): void {
    this._spinnerService.loader$.subscribe({
      next: (res) => {
        setTimeout(() => {
          this.isLoading = res;
        }, 300);
      },
    });
  }
}
