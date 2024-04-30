import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from '../../model/task';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {


  allTasks: Task[] = [];

  constructor(public tasksService: TasksService, private userService: UsersService) { }

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe(allTasks => {
      this.allTasks = allTasks;

      this.allTasks.forEach(x => {        
          this.userService.getUser(x.id).subscribe(user => {
            x.user = user;
          })
        })    
    });
  }

}
