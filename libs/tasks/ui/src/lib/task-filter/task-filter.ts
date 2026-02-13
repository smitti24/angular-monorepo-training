import { Component, input, model } from '@angular/core';

@Component({
  selector: 'ui-task-filter',
  imports: [],
  templateUrl: './task-filter.html',
  styleUrl: './task-filter.css',
})
export class TaskFilter {
  filter = model.required<'all' | 'active' | 'completed'>();
  stats = input.required<{ total: number; done: number; remaining: number }>();
}
