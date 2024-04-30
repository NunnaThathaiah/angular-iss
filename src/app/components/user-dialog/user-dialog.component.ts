// import { Component, OnInit } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-user-dialog',
//   templateUrl: './user-dialog.component.html',
//   styleUrls: ['./user-dialog.component.scss']
// })
// export class UserDialogComponent implements OnInit {

//   constructor(public dialogRef: MatDialogRef<UserDialogComponent>) { }

//   ngOnInit(): void {
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   save(event: any): void {
//     // Perform save logic here

//     // Close the dialog and pass any necessary data back
//     // this.dialogRef.close({ saved: true });
//   }
// }

// import { Component } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-user-dialog',
//   templateUrl: './user-dialog.component.html',
//   styleUrls: ['./user-dialog.component.css']
// })
// export class UserDialogComponent {
//   newUsername: string = '';
//   newPassword: string = '';
//   confirmPassword: string = '';
//   userResponse: any;

//   constructor(public dialogRef: MatDialogRef<UserDialogComponent>) { }

//   saveUser(event: any): void {
//     event.preventDefault();

//     if (this.newPassword !== this.confirmPassword) {
//       // Show error message
//       console.log('Confirm password does not match.');
//       return;
//     }

//     // Perform save logic here
//     // Assuming setUsers and updateUser are methods of your service
//     const userObj = {
//       id: this.userResponse.id ?? 0,
//       username: this.newUsername,
//       password: this.newPassword,
//       action: 'setUser'
//     };

//     // Checking if it's a create or update request
//     if (!userObj.id) {
//       // Call setUsers method
//     } else {
//       // Call updateUser method
//     }

//     // Close the dialog
//     this.dialogRef.close();
//   }

//   closeDialog(): void {
//     this.dialogRef.close();
//   }
// }

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { UserDialogUserConfigService } from '../../services/user-dialog-user-config.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  newUsername: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private dataService: DataService,
    private userDialogUserConfigService: UserDialogUserConfigService
  ) { }

  save(): void {
    // Check if password and confirm password match
    if (this.newPassword !== this.confirmPassword) {
      console.error('Password and confirm password do not match');
      // Handle error, show error message to user
      return;
    }

    // Prepare data object to send to DataService
    const userData = {
      id: 0,
      username: this.newUsername,
      password: this.newPassword,
      action:"setUser"
    };

    // Call create() method of DataService to save the request data
    this.dataService.create('pm/1.2/users', userData).subscribe(
      response => {
        console.log('User created successfully:', response);
        // Trigger update user list
        this.userDialogUserConfigService.updateUserList();
        // Handle successful response, maybe close the dialog
        this.dialogRef.close({ saved: true });
      },
      error => {
        console.error('Failed to create user:', error);
        // Handle error, maybe show error message to user
      }
    );
  }

  // Method to close the dialog
  onNoClick(): void {
    this.dialogRef.close();
  }
}
