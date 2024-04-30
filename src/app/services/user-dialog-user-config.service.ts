// user-dialog-user-config.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDialogUserConfigService {
  private updateUserListSubject = new Subject<void>();

  updateUserList$ = this.updateUserListSubject.asObservable();

  constructor() { }

  // Method to trigger updating user list
  updateUserList(): void {
    this.updateUserListSubject.next();
  }
}
