import { Component } from '@angular/core';
import { SalesComponent } from "../../../salesManagement/saleOperation/sales/sales.component";

@Component({
  selector: 'app-worker',
  standalone: true,
  imports: [SalesComponent],
  templateUrl: './worker.component.html',
  styleUrl: './worker.component.css'
})
export class WorkerComponent {

}
