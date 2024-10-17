import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TopbarComponent } from '../topbar/topbar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MenuComponent,
    MatProgressBarModule,
    TopbarComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  latestVersion: string;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    const authHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `token ${environment.accessTokenGithub}` 
    });

    this.httpClient.get('https://api.github.com/repos/matheusgomes1/TemplateAngularCleanArchitecture/tags', {headers: authHeaders}).subscribe((data: any) => {
      this.latestVersion = data[0].name;
    })
  }
}
