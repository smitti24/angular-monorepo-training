import { Component, computed, effect, inject, signal } from '@angular/core';
import { TaskStore } from '@nx-mf-training/data-access';
import { TaskItem, TaskFilter } from '@nx-mf-training/tasks/ui';

@Component({
  selector: 'lib-task-tracker',
  imports: [TaskItem, TaskFilter],
  templateUrl: './task-tracker.html',
  styleUrl: './task-tracker.css',
})
export class TaskTracker {
  private readonly taskStore = inject(TaskStore);
  readonly tasks = this.taskStore.tasks;
  readonly stats = this.taskStore.stats;

  readonly filter = signal<'all' | 'active' | 'completed'>('all');

  readonly filteredTasks = computed(() => {
    const tasks = this.tasks();
    switch (this.filter()) {
      case 'active':
        return tasks.filter((t) => !t.done);
      case 'completed':
        return tasks.filter((t) => t.done);
      default:
        return tasks;
    }
  });

  constructor() {
    effect(() => {
      const stats = this.stats;
      console.log(`Tasks: ${stats().done}/${stats().total} complete`);
    });
  }

  toggleTask(id: number): void {
    this.taskStore.toggleTask(id);
  }

  addTask(title: string): void {
    this.taskStore.addTask(title);
  }

  removeTask(id: number): void {
    this.taskStore.removeTask(id);
  }
}
