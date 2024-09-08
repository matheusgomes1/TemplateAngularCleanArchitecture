import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDrawer } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingControllerService } from '../../services/loading-controller.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule, 
    MatIconModule, 
    MatProgressBarModule,
    CommonModule 
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  @Input() matDrawer: MatDrawer;

  /**
   *
   */
  constructor(public loadingController: LoadingControllerService) {    
  }
}
