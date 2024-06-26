import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
// import { ColDef, GridReadyEvent, RowNode } from 'ag-grid-community';
// import { GridApi } from 'ag-grid-community';
// import { DEFAULT_COL_DEF } from '../../table/default-col-def';
import { UserDialogService } from '../../services/user-dialog.service';
import { UserDialogUserConfigService } from '../../services/user-dialog-user-config.service';
import { DataService } from '../../services/data.service';
// import { userManagementColDefs } from './user-config-table.model';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrl: './user-config.component.scss'
})
export class UserConfigComponent implements OnInit {
  usersList: any[] = [];
  tableData: any[] = [];
  constructor(
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog,
    private userDialogUserConfigService: UserDialogUserConfigService,
    private userDialogService: UserDialogService,
    private cdRef: ChangeDetectorRef
  ) { }

  //Code for Ag grid similar to nvc
  // public readonly defaultColDef: ColDef = DEFAULT_COL_DEF;
  // public readonly colDefs: ColDef[] = userManagementColDefs;
  // public getRowId({ data }: { data: any}): string {
  //   return data.id.toString();
  // }
  // public onGridReady(event: GridReadyEvent): void {
  //   this.gridApi = event.api;
  // }

  // private mapUsersToTableRows(): void {
  //   this.tableData = this.usersList.map((user) => {
  //     return {
  //       id: user.id,
  //       username: user.username,
  //       lastPasswordChangedDate: user.lastPasswordChangedDate,
  //       daysForPasswordExpiry: user.daysForPasswordExpiry,
  //       maxLoginAttempts: user.maxLoginAttempts,
  //       lockoutTime: user.lockoutTime,
  //       memberOf: user.memberOf
  //     };
  //   });

  //   this.cdRef.detectChanges();
  // }

  ngOnInit(): void {
    this.fetchUserData();
    // Subscribe to update user list event
    this.userDialogUserConfigService.updateUserList$.subscribe(() => {
      this.fetchUserData();
    });
  }
  fetchUserData() {
    this.dataService.read('pm/1.2/users').subscribe(
      (data) => {
        this.usersList = data.response.webObjects; // Assign response data to the usersList property
        this.renderTable(); // Call the method to render table after fetching data
        //code to render tables from ag grid
        // this.mapUsersToTableRows();
      },
      (error) => {
        console.error('Error fetching user data:', error);
        // Handle error
        if(error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    );
  }

  renderTable() {
    const tableBody = document.querySelector('table.usernames tbody');
    tableBody!.innerHTML = ''; // Clear table body before rendering

    this.usersList.forEach(user => {
      let memberOf = '';
      user.group.forEach((groupObj: { name: string; }) => {
        memberOf += groupObj.name + ';&nbsp;';
      });

      const lockoutTime = user.lockoutTime ? user.lockoutTime : user.lockoutTime == 0 ? 'None' : '-';
      const userId = user.id;
      const username = user.username;
      const lastPasswordChangedDate = user.lastPasswordChangedDate;
      const daysForPasswordExpiry = user.daysForPasswordExpiry;
      const maxLoginAttempts = user.maxLoginAttempts || '-';

      const row = document.createElement('tr');
      row.setAttribute('rel', userId);
      row.innerHTML = `
        <td><input id="selectedUser" class="form-check-input" type="checkbox" name="selectedUser" value="${userId}"/>${userId}</td>
        <td>${username}</td>
        <td>${lastPasswordChangedDate}</td>
        <td>${daysForPasswordExpiry}</td>
        <td>${maxLoginAttempts}</td>
        <td>${lockoutTime}</td>
        <td>${memberOf}</td>
      `;
      tableBody!.appendChild(row);
    });
  }

  openDialog(): void {
    // Open dialog using the service
    this.userDialogService.openDialog();
  }
}