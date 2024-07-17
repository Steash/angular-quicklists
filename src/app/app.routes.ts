import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'checklist/:id',
    loadComponent: () => import('./checklist/checklist.component').then(m => m.ChecklistComponent),
  },
  {
    path: 'coffees',
    loadComponent: () => import('./components/coffee-overview/coffee-overview.component').then(m => m.CoffeeOverviewComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
]
