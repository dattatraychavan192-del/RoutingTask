import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  spinnerSub$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  loader$: Observable<boolean> = this.spinnerSub$.asObservable();
  constructor() {}
}
