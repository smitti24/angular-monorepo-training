import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { TaskTracker } from './task-tracker/task-tracker';

@Component({
  imports: [NxWelcome, RouterModule, TaskTracker],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'shell';
}
