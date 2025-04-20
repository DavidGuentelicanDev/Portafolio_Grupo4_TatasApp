import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-prueba-api',
  templateUrl: './prueba-api.page.html',
  styleUrls: ['./prueba-api.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PruebaApiPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
