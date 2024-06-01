import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  userInfo: any = undefined;

  constructor() {}
}
