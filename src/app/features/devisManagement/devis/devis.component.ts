import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-devis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './devis.component.html',
  styleUrl: './devis.component.css'
})
export class DevisComponent {

  // Fake data (Devis)
  devisList = [
    {
      id: 1,
      date: '2026-06-01',
      client: 'Ali Ben Ali',
      total: 1200
    },
    {
      id: 2,
      date: '2026-06-02',
      client: 'Sonia Trabelsi',
      total: 2500
    },
    {
      id: 3,
      date: '2026-06-03',
      client: 'Mohamed Salah',
      total: 800
    }
  ];

  selectedDevis: any = null;

  selectDevis(devis: any) {
    this.selectedDevis = devis;
  }

  deleteDevis(id: number) {
    this.devisList = this.devisList.filter(d => d.id !== id);
  }
}