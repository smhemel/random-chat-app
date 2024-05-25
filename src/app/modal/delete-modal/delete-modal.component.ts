import { Component, effect, inject, signal } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css',
})
export class DeleteModalComponent {
  private chatService = inject(ChatService);
  private router = inject(Router);
  dismiss = signal(false);

  constructor() {
    effect(() => {
      console.log(this.chatService.savedChat());
    });
  }

  deleteChat() {
    const id = (this.chatService.savedChat() as { id: string }).id;

    this.chatService
      .deleteChat(id)
      .then(() => {
        let currentUrl = this.router.url;

        this.dismiss.set(true);

        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([currentUrl]);
          });
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }
}
