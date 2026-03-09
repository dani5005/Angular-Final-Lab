
import { Component, OnInit, DestroyRef, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector:'app-task-list',
  standalone:true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports:[CommonModule,FormsModule,RouterLink,TaskStatusPipe],
  templateUrl:'./task-list.component.html'
})
export class TaskListComponent implements OnInit{

 tasks:Task[] = [];
 filterStatus='all';
 private readonly destroyRef = inject(DestroyRef);

 constructor(private readonly taskService:TaskService){}

ngOnInit(){

  if(this.taskService.getTasks().length === 0){

    this.taskService.loadTasks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {

        this.taskService.setTasks(data.slice(0,20));
        this.tasks = this.taskService.getTasks();

      });

  } else {

    this.tasks = this.taskService.getTasks();

  }

}

 filteredTasks(){

  if(this.filterStatus==='completed'){
    return this.tasks.filter(t=>t.completed);
  }

  if(this.filterStatus==='pending'){
    return this.tasks.filter(t=>!t.completed);
  }

  return this.tasks;

 }

 deleteTask(id:number){

  if(confirm("Delete task?")){
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }

 }

 trackByTaskId(index: number, task: Task){
  return task.id;
}

}
