import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-prueba',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './dashboard-prueba.page.html',
  styleUrls: ['./dashboard-prueba.page.scss'],
})
export class DashboardPruebaPage {}

