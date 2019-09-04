import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

    id: number;
    text: string;

    constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<ConfirmationModalComponent>) {
        // texto por defecto
        this.text = '¿Desea confirmar su acción?';
    }

    ngOnInit() {
        this.id = this.defaults && this.defaults.id ? this.defaults.id : undefined;
        this.text = this.defaults && this.defaults.text ? this.defaults.text : this.text;
    }

    save(event: any): void {
        event.stopPropagation();
        this.dialogRef.close(true);
    }

    onNoClick(event: any): void {
        event.stopPropagation();
        this.dialogRef.close(false);
    }
}
