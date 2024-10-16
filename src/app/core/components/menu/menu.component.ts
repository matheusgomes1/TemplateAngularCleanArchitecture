import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatExpansionModule, 
    MatButtonModule, 
    MatListModule, 
    MatDividerModule,
    MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  @Input() drawer: MatDrawer;

  constructor(private router: Router) {
  }

  redirecionar(route: string) {
    this.router.navigate([route]);
    this.drawer.close();
  }
}
