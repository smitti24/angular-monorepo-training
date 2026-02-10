import { Component, computed, effect, signal } from '@angular/core';
import { Task } from './task';

@Component({
  selector: 'app-task-tracker',
  imports: [],
  templateUrl: './task-tracker.html',
  styleUrl: './task-tracker.css',
})
export class TaskTracker {
  readonly tasks = signal<Task[]>([
    { id: 1, title: 'Learn signals', done: true },
    { id: 2, title: 'Build with NX', done: false },
    { id: 3, title: 'Setup microfrontends', done: false },
  ])

  readonly filter = signal<'all' | 'active' | 'completed'>('all')

  readonly filteredTasks = computed(() => {
    const tasks = this.tasks();

    switch (this.filter()) {
      case 'active': return tasks.filter(task => !task.done)
      case 'completed': return tasks.filter(task => task.done)
      default: return tasks;
    }
  })

  readonly stats = computed(() => {
    const tasks = this.tasks();
    const done = tasks.filter(task => task.done)

    return {
      total: tasks.length,
      done: done.length,
      remaining: tasks.length - done.length
    }
  })

  constructor(){
    effect(() => {
      const stats = this.stats()
      console.log(`Tasks: ${stats.done}/${stats.total} complete`);
    })
  }

  addTask(title: string): void {
    if (!title.trim()) return;

    this.tasks.update(tasks => [...tasks, {
      id: Date.now(),
      title,
      done: false
    }])
  }

  toggleTask(id: number): void {
    this.tasks.update(tasks => tasks.map(t => t.id === id ? {
      ...t,
      done: !t.done
    }: t))
  }

  removeTask(id: number): void {
    this.tasks.update(tasks => tasks.filter(t => t.id !== id))
  }
}
