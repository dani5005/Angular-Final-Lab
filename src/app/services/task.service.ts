import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  private readonly http = inject(HttpClient);

  private readonly tasks = signal<Task[]>([]);

  loadTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  setTasks(newTasks: Task[]) {
    this.tasks.set(newTasks);
  }

  getTasks(): Task[] {
    return this.tasks();
  }

  getTask(id: number): Task | undefined {
    return this.tasks().find(t => t.id === id);
  }

  addTask(task: Task) {
    this.tasks.update(tasks => [
      ...tasks,
      { ...task, id: tasks.length + 1 }
    ]);
  }

  updateTask(task: Task) {
    this.tasks.update(tasks =>
      tasks.map(t => t.id === task.id ? task : t)
    );
  }

  deleteTask(id: number) {
    this.tasks.update(tasks =>
      tasks.filter(t => t.id !== id)
    );
  }
}