import { computed, Injectable, signal } from "@angular/core";
import { Task } from "../task";

@Injectable({providedIn: 'root'})
export class TaskStore {
    private readonly _tasks = signal<Task[]>([
        { id: 1, title: 'Learn signals', done: true },
        { id: 2, title: 'Build with NX', done: false },
        { id: 3, title: 'Setup microfrontends', done: false },
      ])
      readonly tasks = this._tasks.asReadonly()

      readonly stats = computed(() => {
        const tasks = this.tasks();
        const done = tasks.filter(task => task.done)

        return {
          total: tasks.length,
          done: done.length,
          remaining: tasks.length - done.length
        }
      })

      addTask(title: string): void {
        if (!title.trim()) return;

        this._tasks.update(tasks => [...tasks, {
          id: Date.now(),
          title,
          done: false
        }])
      }

      toggleTask(id: number): void {
        this._tasks.update(tasks => tasks.map(t => t.id === id ? {
          ...t,
          done: !t.done
        }: t))
      }

      removeTask(id: number): void {
        this._tasks.update(tasks => tasks.filter(t => t.id !== id))
      }
}