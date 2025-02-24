import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { ContainerComponent } from "./container/container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fullstack-exam';
}
