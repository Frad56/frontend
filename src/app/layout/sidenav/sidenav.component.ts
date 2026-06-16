import { Component } from '@angular/core';
import { SidenavService } from '../sidenav.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  isToggled = false;
  username = 'Admin';  

  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {
    this.sidenavService.isToggled$.subscribe(state => {
      this.isToggled = state;
    });
  }
}
