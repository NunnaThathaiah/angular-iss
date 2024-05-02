import { ColDef } from 'ag-grid-community';
// import { ButtonsCellRenderComponent, TableButton } from '@niagara/ui';
export const userManagementColDefs: ColDef[] = [
  {
    headerName: 'User Name',
    field: 'username',
    tooltipField: 'username',
  },
  {
    headerName: 'Last Password Changed Date',
    field: 'lastPasswordChangedDate',
    tooltipField: 'lastPasswordChangedDate',
  },
  {
    headerName: 'Days until Password Expires',
    field: 'daysForPasswordExpiry',
    tooltipField: 'daysForPasswordExpiry',
  },
  {
    headerName: 'Maximum Login Attempts',
    field: 'maxLoginAttempts',
    tooltipField: 'maxLoginAttempts',
  },
  {
    headerName: 'Lockout Time',
    field: 'lockoutTime',
    tooltipField: 'lockoutTime',
  },
  {
    headerName: 'Member Of',
    field: 'memberOf',
    tooltipField: 'memberOf',
  },
];

export interface UserTableRow {
  id?: number;
  email: string;
  role: string;
  deleted?: boolean;
  username?: string;
}
