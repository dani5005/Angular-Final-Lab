
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  private tasks: Task[] = [];

  constructor(private http: HttpClient) {}

  loadTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  getTask(id:number){
    return this.tasks.find(t => t.id === id);
  }

  addTask(task:Task){
    task.id = this.tasks.length + 1;
    this.tasks.push(task);
  }

  updateTask(task:Task){
    const index = this.tasks.findIndex(t=>t.id===task.id);
    if(index>-1){
      this.tasks[index] = task;
    }
  }

  deleteTask(id:number){
    this.tasks = this.tasks.filter(t=>t.id!==id);
  }
}
