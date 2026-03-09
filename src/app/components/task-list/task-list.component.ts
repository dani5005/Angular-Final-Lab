import { Component, OnInit, DestroyRef, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-task-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, RouterLink, TaskStatusPipe],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  filterStatus: 'all' | 'completed' | 'pending' = 'all';

  private readonly taskService = inject(TaskService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {

    const existingTasks = this.taskService.getTasks();

    if (existingTasks.length === 0) {

      this.taskService.loadTasks()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(data => {

          this.taskService.setTasks(data.slice(0, 20));
          this.tasks = this.taskService.getTasks();

        });

    } else {

      this.tasks = existingTasks;

    }
  }

  filteredTasks(): Task[] {

    switch (this.filterStatus) {
      case 'completed':
        return this.tasks.filter(t => t.completed);

      case 'pending':
        return this.tasks.filter(t => !t.completed);

      default:
        return this.tasks;
    }

  }

  deleteTask(id: number): void {

    if (confirm('Delete task?')) {
      this.taskService.deleteTask(id);
      this.tasks = this.taskService.getTasks();
    }

  }

  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }

}