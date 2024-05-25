import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private supabase!: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async chatMessage(message: string): Promise<any> {
    try {
      const { data, error } = await this.supabase
        .from('chat')
        .insert({ message });

      if (error) {
        alert(error.message);
      }
    } catch (e: any) {
      alert(e.message);
    }
  }

  async allChat(): Promise<any> {
    try {
      const { data, error } = await this.supabase
        .from('chat')
        .select('*, users(*)');

      if (error) {
        alert(error.message);
      }

      return data;
    } catch (err) {
      throw err;
    }
  }
}
