
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';
import { Task } from '../../models/task.model';

@Component({
 selector:'app-task-detail',
 standalone:true,
 imports:[CommonModule,TaskStatusPipe],
 templateUrl:'./task-detail.component.html'
})
export class TaskDetailComponent implements OnInit{

 task?:Task;

 constructor(
  private route:ActivatedRoute,
  private taskService:TaskService
 ){}

 ngOnInit(){
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.task = this.taskService.getTask(id);
 }
}
