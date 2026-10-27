import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-confirm',
  templateUrl: './get-confirm.component.html',
  styleUrls: ['./get-confirm.component.scss'],
})
export class GetConfirmComponent {
  constructor(
    private _dialogRef: MatDialogRef<GetConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public msg: string,
  ) {}

  onClose(flag: boolean): void {
    this._dialogRef.close(flag);
  }
}
