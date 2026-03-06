
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';

@Component({
  selector:'app-task-list',
  standalone:true,
  imports:[CommonModule,FormsModule,RouterLink,TaskStatusPipe],
  templateUrl:'./task-list.component.html'
})
export class TaskListComponent implements OnInit{

 tasks:Task[] = [];
 filterStatus='all';

 constructor(private taskService:TaskService){}

 ngOnInit(){

  if(this.taskService.getTasks().length===0){
    this.taskService.loadTasks().subscribe(data=>{
      this.taskService.setTasks(data.slice(0,20));
      this.tasks = this.taskService.getTasks();
    });
  }else{
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
}
