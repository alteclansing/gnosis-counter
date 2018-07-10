import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: []
})
export class CustomMaterialModule { }
