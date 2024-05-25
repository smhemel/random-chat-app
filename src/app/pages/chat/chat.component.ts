import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  private router = inject(Router);
  private auth = inject(AuthService);
  private chatService = inject(ChatService);
  private formBuilder = inject(FormBuilder);

  chatForm!: FormGroup;

  constructor() {
    this.chatForm = this.formBuilder.group({
      chat_message: ['', Validators.required],
    });
  }

  async onSubmit() {
    this.chatService
      .chatMessage(this.chatForm.value.chat_message)
      .then((res) => {
        alert('message successfully saved.');
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
