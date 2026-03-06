
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
 selector:'app-add-task',
 standalone:true,
 imports:[CommonModule,FormsModule],
 templateUrl:'./add-task.component.html'
})
export class AddTaskComponent{

 task:Task = {
  id:0,
  userId:1,
  title:'',
  completed:false
 };

 constructor(
  private taskService:TaskService,
  private router:Router
 ){}

 addTask(){

  this.taskService.addTask(this.task);
  this.router.navigate(['/tasks']);

 }
}
