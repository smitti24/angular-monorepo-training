import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskTracker } from '@nx-mf-training/feature';

@Component({
  imports: [RouterModule, TaskTracker],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'shell';
}
