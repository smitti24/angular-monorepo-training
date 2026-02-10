import { Component, computed, effect, inject, signal } from '@angular/core';
import { TaskItem } from './components/task-item/task-item';
import { TaskFilter } from './components/task-filter/task-filter';
import { TaskStore } from './store/task.store';

@Component({
  selector: 'app-task-tracker',
  imports: [TaskItem, TaskFilter],
  templateUrl: './task-tracker.html',
  styleUrl: './task-tracker.css',
})
export class TaskTracker {
  private readonly taskStore = inject(TaskStore)
  readonly tasks = this.taskStore.tasks
  readonly stats = this.taskStore.stats

  readonly filter = signal<'all' | 'active' | 'completed'>('all');

  readonly filteredTasks = computed(() => {
    const tasks = this.tasks();
    switch (this.filter()) {
      case 'active': return tasks.filter(t => !t.done);
      case 'completed': return tasks.filter(t => t.done);
      default: return tasks;
    }
  });


  constructor(){
    effect(() => {
      const stats = this.stats
      console.log(`Tasks: ${stats().done}/${stats().total} complete`);
    })
  }


  toggleTask(id: number): void {
    this.taskStore.toggleTask(id)
  }

  addTask(title: string): void {
    this.taskStore.addTask(title)
  }

  removeTask(id: number): void {
    this.taskStore.removeTask(id)
  }
}
