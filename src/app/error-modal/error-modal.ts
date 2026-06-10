import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  imports: [ CommonModule ],
  templateUrl: './error-modal.html',
  styleUrl: './error-modal.css',
  standalone: true,
})
export class ErrorModal {
  isOpen = signal(false);
  message = signal('');

  show(errorMessage: string): void {
    this.message.set(errorMessage);
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
