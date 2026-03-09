
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <h2>Welcome to the Task Manager</h2>
  <p>Use the navigation to manage tasks.</p>
  `
})
export class HomeComponent {}
