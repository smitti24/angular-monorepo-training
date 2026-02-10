import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-task-filter',
  imports: [],
  templateUrl: './task-filter.html',
  styleUrl: './task-filter.css',
})
export class TaskFilter {
  filter = model.required<'all' | 'active' | 'completed'>();
  stats = input.required<{ total: number; done: number; remaining: number }>();
}
