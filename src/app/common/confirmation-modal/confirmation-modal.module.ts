import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatInputModule, MatMenuModule, MatRadioModule, MatSelectModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MaterialModule } from '@app/core/common/material-components.module';
import { ConfirmationModalComponent } from './confirmation-modal.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        // FlexLayoutModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatRadioModule,
        MatSelectModule,
        MatMenuModule,
        MatToolbarModule,
        MatCardModule,
        // MaterialModule
    ],
    declarations: [ConfirmationModalComponent],
    entryComponents: [ConfirmationModalComponent],
    exports: [ConfirmationModalComponent]
})
export class ConfirmationModalModule { }
