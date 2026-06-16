import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private toggledSource = new BehaviorSubject<boolean>(false);
  isToggled$ = this.toggledSource.asObservable();

  toggle() {
    this.toggledSource.next(!this.toggledSource.getValue());
  }
}
