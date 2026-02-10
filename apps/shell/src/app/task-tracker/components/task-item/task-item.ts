import { Component, input, output } from '@angular/core';
import { Task } from '../../task';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  task = input.required<Task>()
  toggleTask = output<number>()
  removeTask = output<number>()

  onToggleTask(id: number): void {
    this.toggleTask.emit(id)
  }

  onRemoveTask(id: number): void {
    this.removeTask.emit(id)
  }
}
