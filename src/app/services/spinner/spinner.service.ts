import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  isLoading$ = new BehaviorSubject<boolean>(true);

  constructor() { }
  show(): void {
    this.isLoading$.next(true);
  }
  hide(): void {
    this.isLoading$.next(false);
  }

}
