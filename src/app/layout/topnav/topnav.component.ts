import { Component } from '@angular/core';
import { SidenavService } from '../sidenav.service';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.css'
})
export class TopnavComponent {
  constructor(private sidenavService: SidenavService) {}

  toggleSidebar() {
    this.sidenavService.toggle();  
  }
}
