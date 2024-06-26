import { Component, Input, OnInit } from '@angular/core';
import {Task } from '../../model/task'
import { CustomTooltipDirective } from '../../shared/tooltip.directive'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input()
  task!: Task;

  constructor() { }

  ngOnInit(): void {
  }

}
