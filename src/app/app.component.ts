
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
  <h1>Task Manager</h1>

  <nav>
  <a routerLink="/">Home</a> |
  <a routerLink="/tasks">Tasks</a> |
  <a routerLink="/add-task">Add Task</a>
  </nav>

  <router-outlet></router-outlet>
  `
})
export class AppComponent {}
