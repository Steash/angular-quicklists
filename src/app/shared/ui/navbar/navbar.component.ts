import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, CommonModule, RouterLink],
  template: `
    <mat-toolbar class="navbar">
      
      <span routerLink="/home">Jim's super app</span>
      <span class="example-spacer"></span>
      <a routerLink="/coffees">
        <button>
          <mat-icon>local_cafe</mat-icon>
        </button>
      </a>
      <!-- <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
        <mat-icon>favorite</mat-icon>
      </button>
      <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
        <mat-icon>share</mat-icon>
      </button>
      <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
        <mat-icon>menu</mat-icon>
      </button> -->
    </mat-toolbar>
  `,
  styles: `
    .navbar {
      background: var(--color-light-grey);
      height: 80px
    }
    .example-spacer {
      flex: 1 1 auto;
    }
  `
})
export class NavbarComponent {

}
