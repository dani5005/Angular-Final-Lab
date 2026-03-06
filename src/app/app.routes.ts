
import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

export const routes: Routes = [
 {path:'',component:HomeComponent},
 {path:'tasks',component:TaskListComponent},
 {path:'tasks/:id',component:TaskDetailComponent},
 {path:'tasks/:id/edit',component:EditTaskComponent},
 {path:'add-task',component:AddTaskComponent}
];
