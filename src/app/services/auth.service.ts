import { Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { UserDataService } from './shared/user-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase!: SupabaseClient;

  private userData = inject(UserDataService);
  private _ngZone = inject(NgZone);

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      localStorage.setItem(
        'angular-chat-session',
        JSON.stringify(session?.user)
      );

      if (session?.user) {
        this._ngZone.run(() => {
          this.router.navigate(['/chat']);
        });
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('angular-chat-session') as string;
    if (user === undefined) {
      return false;
    }

    this.userData.userInfo = {
      id: JSON.parse(user).id,
      ...JSON.parse(user).user_metadata,
    };

    return true;
  }

  async SignInGoogle() {
    await this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  async SignOut() {
    await this.supabase.auth.signOut();
  }
}
