import { Component, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChatService } from '../../services/chat/chat.service';
import { Chat } from '../../interface/chat-response';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  private router = inject(Router);
  private auth = inject(AuthService);
  private chatService = inject(ChatService);
  private formBuilder = inject(FormBuilder);

  chatForm!: FormGroup;

  chats = signal<Chat[]>([]);

  constructor() {
    this.chatForm = this.formBuilder.group({
      chat_message: ['', Validators.required],
    });

    effect(() => {
      this.onListChat();
    });
  }

  async onSubmit() {
    this.chatService
      .chatMessage(this.chatForm.value.chat_message)
      .then((res) => {
        alert('message successfully saved.');
        this.chatForm.reset();
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  onListChat() {
    this.chatService
      .allChat()
      .then((res) => {
        if (res != null) {
          this.chats.set(res);
        } else {
          alert('No Chats found.');
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  async logOut() {
    this.auth
      .SignOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        alert(err.message);
      });
  }
}
