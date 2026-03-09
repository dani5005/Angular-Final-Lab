
import { Component,OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
 selector:'app-edit-task',
 standalone:true,
 changeDetection: ChangeDetectionStrategy.OnPush,
 imports:[CommonModule,FormsModule],
 templateUrl:'./edit-task.component.html'
})
export class EditTaskComponent implements OnInit{

 task?:Task;

 constructor(
  private readonly route:ActivatedRoute,
  private readonly router:Router,
  private readonly taskService:TaskService
 ){}

 ngOnInit(){

  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.task = this.taskService.getTask(id);

 }

 save(){

  if(this.task){
    this.taskService.updateTask(this.task);
    this.router.navigate(['/tasks']);
  }

 }
}
